module ApplicationHelper
  def authr_client_config
    content_tag :script, type: :module do
      "window.AUTHR_CONFIG = Object.freeze(#{{
        siteName: Authr::CONFIG[:site_name]
      }.to_json})".html_safe
    end
  end
end
