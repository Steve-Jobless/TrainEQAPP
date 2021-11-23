class AddMarkasdoneToMeetings < ActiveRecord::Migration[6.1]
  def change
    add_column :meetings, :mark_as_done, :boolean, default: false
  end
end
