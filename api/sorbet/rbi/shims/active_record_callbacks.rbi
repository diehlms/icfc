# typed: true

# Shim for ActiveRecord callback class methods
module ActiveRecord::Callbacks::ClassMethods
  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def before_create(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def before_save(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def after_create(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def after_save(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def before_update(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def after_update(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def before_destroy(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).void }
  def after_destroy(*args, &block); end
end
