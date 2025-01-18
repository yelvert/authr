json.partial! "application", application: @application

json.groups_custom_ids @application.groups_custom_ids
json.groups_generated_ids @application.groups_generated_ids
json.users_custom_ids @application.users_custom_ids
json.users_generated_ids @application.users_generated_ids
