# typed: true

# Shim for FriendlyId DSL method
module FriendlyId
  sig { params(base: Symbol, options: T.untyped).void }
  def friendly_id(base, **options); end
end
