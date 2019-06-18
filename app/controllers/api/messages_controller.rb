class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id > #{params[:id]} and group_id = #{params[:group_id]}")
    respond_to do |format|
      format.json
    end
  end
end