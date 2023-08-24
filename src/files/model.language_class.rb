module BxBlockClasses
	class LanguageClass < ApplicationRecord
  	self.table_name = :language_classes
  	
      
      validates :language, presence: true
      validates :study_format, presence: true
      validates :class_level, presence: true
      validates :class_type, presence: true
      validates :class_plan, presence: true
      validates :class_date, presence: true
      validates :class_time, presence: true

      validate :class_date_cannot_be_today_or_less



      def class_date_cannot_be_today_or_less
        if class_date.present? && class_date <= Date.today
          errors.add(:class_date, "cant be in the past")
        end
      end

	end
end
