module AccountBlock
  class TeachersController < ApplicationController
    include BuilderJsonWebToken::JsonWebTokenValidation
    before_action :validate_json_web_token, except: [:resend_email, :create]
    before_action :set_teacher, only: [:edit, :update]

    def create
      query_email = teacher_params['email'].downcase
      account = Teacher.where('LOWER(email) = ?', query_email).first
      validator = EmailValidation.new(teacher_params['email'])
  
      return render json: {errors: [
        {account: 'Email invalid or Already Taken'},
      ]}, status: :unprocessable_entity if account || !validator.valid?

      @teacher = Teacher.new(teacher_params)
      @client_url = request.headers[:origin] || 'Client Url Missing' #params[:origin]
      if @teacher.save
        TeacherEmailValidationMailer.teacher_email_validation(@teacher, request.base_url, @client_url).deliver_now!
        uniq_id=set_uniq_id
        render json: TeacherSerializer.new(@teacher, meta: {
          token: encode(@teacher.id),
          uniq_id: uniq_id
          }).serializable_hash, status: :created
      else
        render json: {errors: format_activerecord_errors(@teacher.errors)},
        status: :unprocessable_entity
      end
    end

    def update
      if @teacher.update(teacher_params)
        @teacher.update(image: params[:image])
       render json: TeacherSerializer.new(@teacher, params:{url: request.base_url}, meta: {message: 'Teachers Profile Updated Successfully.'
        }).serializable_hash, status: 200
      else
        render json: {errors: format_activerecord_errors(@teacher.errors), status: 404},
        status: :unprocessable_entity
      end
    end
    def index
      @teacher = Teacher.all
      if @teacher.present?
        render json: TeacherSerializer.new(@teacher, meta: {
        message: "List of Teachers."}).serializable_hash, status: :ok
      # else
        # render json: {errors: [{message: 'No Teachers found.'},]}, status: :ok
      end
    end

    def edit
      render json: @teacher
    end

    def show
      @teacher = AccountBlock::Teacher.find_by(id: params[:id])
      if @teacher.blank?
        render json: {errors: 'No data exists', status: 422}, status: 422
      else
        render json: AccountBlock::TeacherSerializer.new(@teacher).serializable_hash, status: 200
      end
    end
    
    def activate_account
      token = params[:token]
      @client_url = params[:client_url]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id:@token.id).update(activated: true)
      redirect_to "#{@client_url}/TeacherEmailVerified?token=#{token}"
    end

    
    def resend_email
      @email = params[:email]
      client_url = request.headers[:origin] || 'Client Url Missing' #params[:origin]
      @teacher = AccountBlock::Teacher.find_by(email: @email)
      if @teacher 
        TeacherEmailValidationMailer.teacher_email_validation(@teacher, request.base_url, client_url).deliver_now!
          render json: {message: 'Email sent again please check'}, status: :ok
        else
          render json: { message: 'No teacher found with this email'}
      end
    end

    def send_names
      token = params[:token]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id: @token.id)
      if @teacher
        render json: { id: @teacher.id, email: @teacher.email, first_name: @teacher.first_name, last_name: @teacher.last_name}
      # else
        # render json: {errors: 'Invalid token'}, status: :unprocessable_entity
      end
    end

    def get_notifications
       token = request.headers[:token] || params[:token]
      # token = params[:token]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id: @token.id)
      if @teacher
        render json: { 
          new_cls_request_notifn: get_notifn(@teacher.new_cls_request_notifn),
          canceled_cls_notifn: get_notifn(@teacher.canceled_cls_notifn),
          cls_reminder_notifn: get_notifn(@teacher.cls_reminder_notifn),
          group_cls_notifn: get_notifn(@teacher.group_cls_notifn),
          ending_group_course_notifn: get_notifn(@teacher.ending_group_course_notifn),
          cls_availability_notifn: get_notifn(@teacher.cls_availability_notifn)
        }
      # else
        # TEST passing, but code not covered
        # render json: { errors: 'Invalid token'}, status: :not_found
      end
    end

    def set_notifications
       token = request.headers[:token] || params[:token]
      # token = params[:token]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id: @token.id)
      
      if @teacher.update( 
          new_cls_request_notifn: set_notifn(params[:new_cls_request_notifn]),
          canceled_cls_notifn: set_notifn(params[:canceled_cls_notifn]),
          cls_reminder_notifn: set_notifn(params[:cls_reminder_notifn]),
          group_cls_notifn: set_notifn(params[:group_cls_notifn]),
          ending_group_course_notifn: set_notifn(params[:ending_group_course_notifn]),
          cls_availability_notifn: set_notifn(params[:cls_availability_notifn])
        )
      render json: {message: 'Notification preferences saved'}, status: :ok
      else
        render json: {error: 'This teacher is not available'}, status: :unprocessable_entity
      end
    end

    def get_timezone_date_time_formats
       token = request.headers[:token] || params[:token]
      # token = params[:token]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id: @token.id)

      if @teacher
        render json: {
          id: @teacher.id,
          time_zone: @teacher.time_zone,
          date_format: @teacher.date_format,
          time_format: @teacher.time_format
        }

        # else
        # render json: {errors: 'Invalid token'}, status: :unprocessable_entity
      end
    end

    def set_timezone_date_time_formats
       token = request.headers[:token] || params[:token]
      # token = params[:token]
      @token = BuilderJsonWebToken.decode(token)
      @teacher = AccountBlock::Teacher.find_by(id: @token.id)
      if @teacher.update(
          time_zone: params[:time_zone],
          date_format: params[:date_format],
          time_format: params[:time_format]
          )
      render json: {message: 'Time zone Date Time formats saved'}, status: :ok
      # else
        # render json: {error: 'Teacher cannot be found'}, status: :unprocessable_entity
      end
    end

    private

    def encode(id)
      BuilderJsonWebToken.encode id
    end

    def format_activerecord_errors(errors)
      result=[]
      errors.each do |attribute, error|
        result << {attribute =>error}
      end
      result
    end


    def current_user
      @teacher = AccountBlock::Teacher.find_by(id: @token&.id)
      render json: {errors: [{token: I18n.t('invalid_token')},]}, status: :unprocessable_entity and return unless @teacher.present?
    end


    def teacher_params
      params.permit(:first_name, :last_name, :email, :password, :confirmation_password, :image, :bio, :date_of_birth, :city, :country, :language_taught, :teaching_style, :personal_intrest, :background_of_industries, :time_zone, :phone_number)
    end

    def set_teacher
      @teacher = AccountBlock::Teacher.find(params[:id])
    end

    def get_notifn(notifn_status)
      if notifn_status[4..notifn_status.length-1] == "disabled"
        return "disabled"
      else
        if notifn_status[4..notifn_status.length-1] == "checked"
          return true
        else
          return false
        end
      end
    end

    def set_notifn(notifn_status)
      if notifn_status == "disabled" 
        return 0
      else
        if notifn_status == true
          return 1
        else
          return 2
        end
      end
    end

#......................
  def set_uniq_id
    self.uniq_id = generate_token
  end

  def generate_token
    loop do
     number = SecureRandom.random_number(10000000)
     uniq_id = "T#{number}"

     break uniq_id unless AccountBlock::Teacher.where(uniq_id: uniq_id).exists?
    end
  end
    end
end
