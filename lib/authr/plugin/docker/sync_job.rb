module Authr
  module Plugin
    class Docker
      class SyncDockerJob < ApplicationJob
        limits_concurrency to: 1, key: "sync_docker"

        def perform
          docker_apps = Container.all.map do |container|
            container.application.assign_attributes(active: true)
            container.application.save!
            container.application
          end
          Application.where(source: "docker", active: true).where("id NOT IN (?)", docker_apps.map(&:id)).each do |app|
            app.assign_attributes(active: false)
            app.save!
          end
        end
      end
    end
  end
end
