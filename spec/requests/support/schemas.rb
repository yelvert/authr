module SchemaHelpers
  def global_schema(name, schema)
    RSpec.configure do |c|
      c.openapi_specs.values.first[:components][:schemas][name] = schema
    end
  end

  def schema_ref(name) = "#/components/schemas/#{name}"
  def schema_ref_obj(name) = { '$ref': schema_ref(name) }

  def error_schema(name, attributes)
    schema = {
      type: :object,
      properties: attributes.inject({}) do |memo, attr|
        memo[attr] = schema_ref_obj(:attribute_error)
        memo
      end
    }
    RSpec.configure do |c|
      c.openapi_specs.values.first[:components][:schemas][name] = schema
    end
    schema
  end
end

RSpec.configure do |c|
  c.extend SchemaHelpers
end
