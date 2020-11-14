class Chart < ApplicationRecord

    self.per_page = 30
    
    belongs_to :user
    
    validates :caption, length: { maximum: 30}
    validates :user_id, presence: true
    validates :chart, presence: true
    
    mount_uploader :chart, ChartUploader
    
end
