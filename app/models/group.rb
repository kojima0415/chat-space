class Group < ApplicationRecord
  validates :name, presence: true , uniqueness: true

  has_many :members
  has_many :users, through: :members
  has_many :messages

  def show_last_message
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : "画像が投稿されています。"
    else
      "まだメッセージはありません。"
    end
  end
end
