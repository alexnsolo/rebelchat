Sequel.migration do
  up do
    create_table :chatrooms do
      primary_key :id
      String :name
    end
  end

  down do
    drop_table :chatrooms
  end
end
