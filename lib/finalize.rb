module Finalize
  def self.extended(obj)
    TracePoint.trace(:end) do |t|
      if obj == t.self
        obj.respond_to?(:__finalize__, true) && obj.send(:__finalize__)
        t.disable
      end
    end
  end
end
