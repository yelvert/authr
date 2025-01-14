class HashType < ActiveModel::Type::Value
  def type = :hash

  def cast(value)
    value.to_h rescue {}
  end
end

ActiveRecord::Type.register(:hash, HashType)
ActiveModel::Type.register(:hash, HashType)

class JSONArray < ActiveModel::Type::Value
  def type = :json_array

  # Converts a value from database input to the appropriate ruby type. The
  # return value of this method will be returned from
  # ActiveRecord::AttributeMethods::Read#read_attribute. The default
  # implementation just calls Value#cast.
  #
  # +value+ The raw input, as provided from the database.
  def deserialize(value)
    if value.nil?
      []
    elsif value.is_a? String
      JSON.parse(value)
    elsif value.is_a? Array
      value
    else
      Rails.logger.error "JSONArray Type cannot convert #{value.inspect}"
      []
    end
  end

  # Type casts a value from user input (e.g. from a setter). This value may
  # be a string from the form builder, or a ruby object passed to a setter.
  # There is currently no way to differentiate between which source it came
  # from.
  #
  # The return value of this method will be returned from
  # ActiveRecord::AttributeMethods::Read#read_attribute. See also:
  # Value#cast_value.
  #
  # +value+ The raw input, as provided to the attribute setter.
  def cast(value)
    if value.nil?
      []
    elsif value.is_a? String
      JSON.parse(value)
    elsif value.is_a? Array
      value
    else
      Rails.logger.error "JSONArray Type cannot convert #{value.inspect}"
      []
    end
  end

  # Casts a value from the ruby type to a type that the database knows how
  # to understand. The returned value from this method should be a
  # +String+, +Numeric+, +Date+, +Time+, +Symbol+, +true+, +false+, or
  # +nil+.
  def serialize(value)
    (value || []).to_json
  end
end

ActiveRecord::Type.register(:json_array, JSONArray)
ActiveModel::Type.register(:json_array, JSONArray)
