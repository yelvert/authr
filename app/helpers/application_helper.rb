module ApplicationHelper
  def authr_client_config
    content_tag :script, type: :module do
      "window.AUTHR_CONFIG = Object.freeze(#{{
        siteName: Authr::CONFIG[:site_name]
      }.to_json})".html_safe
    end
  end

  def render_json(template, id, **params)
    content_tag :script, type: "application/json", id: id do
      render(template: template, formats: [ :json ], handler: :jbuilder, **params).html_safe
    end.html_safe
  end
end
