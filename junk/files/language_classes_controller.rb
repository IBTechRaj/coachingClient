
module BxBlockClasses
	class LanguageClassesController < ApplicationController
    include TZInfo
		before_action :set_language_class, only: [:show, :update, :destroy]

   def index
    @language_classes = LanguageClass.all
    render json: @language_classes
   end

   def show
	  	if @language_class
## IMPORTANT : Take care of (1) get remote timezone; (2) if date changes after conversion
## bundle exec rake time:zones:all
        
          

       
          local_tz_name = Time.zone.name
          local_tz_offset = Time.now.in_time_zone(local_tz_name).utc_offset
          local_tz_formatted_offset = Time.now.in_time_zone(local_tz_name).formatted_offset

          cls_tz_name = ActiveSupport::TimeZone['GMT'].name
          cls_tz_offset = Time.now.in_time_zone(cls_tz_name).utc_offset
          cls_tz_formatted_offset = Time.now.in_time_zone(cls_tz_name).formatted_offset

         
          converted_cls_time = @language_class.class_time + local_tz_offset

          @content = {
              local_tz_name: local_tz_name,
              local_tz_offset: local_tz_offset,
              local_tz_formatted_offset: local_tz_formatted_offset,
              cls_tz_name: cls_tz_name,
              cls_tz_offset: cls_tz_offset,
              cls_tz_formatted_offset: cls_tz_formatted_offset,
         
              cls_zone: @language_class.time_zone,
              cls_time: @language_class.class_time.strftime("at %I:%M %p")  ,
              cls_time_local: converted_cls_time.strftime("at %I:%M %p"),
          }

       	render json:{ data: @content, status: :ok}
			end
   end

  def create
    @language_class = LanguageClass.new(language_class_params)

    if @language_class.save
      render json: @language_class, status: :created, location: @language_class
    else
      render json: @language_class.errors, status: :unprocessable_entity
    end
  end

  def update
    if @language_class.update(language_class_params)
      render json:   {message: 'Language class Updated Successfully' }, status: 200
    else
      render json: { errors: @language_class.errors}, status: 404
    end
   end

   def destroy
    @language_class.destroy
   end

  private
    
    def set_language_class
      @language_class = LanguageClass.find(params[:id])
    end

    def language_class_params
      params.permit(:language, :study_format, :class_level, :class_type, :class_plan, :class_date, :class_time, :time_zone)
    end

	end
end
