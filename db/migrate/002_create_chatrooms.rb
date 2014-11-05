Sequel.migration do
  up do
    create_table :chatrooms do
      primary_key :id
    end
  end

  down do
    drop_table :chatrooms
  end
end
