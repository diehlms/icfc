# trix-rails changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Master

Not released

## 2.4.0

Released December 15th, 2021

- 🚫 Remove old appraisals for Rails 5.1.x and below (support will be removed in trix-rails 3.x)
- ✅ Add Appraisal configuration for Rails 7
- ✅ Relax gemspec to support Rails versions greater than 4.x
- ✅ Setup GitHub CI for running gem tests against Ruby 2.7 and 3.0
- 💪 Bump version to 2.4.0

## 2.3.0

Released December 6th, 2020

- ✅ Relax gemspec for Rails 6.1 and higher offical release.
- ✅ Add Appraisal configration for Rails 6.1.
- ✅ Upgrade to [Trix 1.3.1](https://github.com/basecamp/trix/releases/tag/1.3.1)
- 💪 Bump to version 2.3.0

## 2.2.0

Released September 13, 2019

- ✅ Upgrade to [Trix 1.2.0](https://github.com/basecamp/trix/releases/tag/1.2.0)
- 💪 Bump to version 2.2.0
- 🚫 Remove appraisals for Rails 4.2 (support will be removed in trix-rails 3.x)

## 2.1.0

Released September 9, 2019

- 🐛🔨 Add customizable input name for trix-editor in simple form ([#12](https://github.com/kylefox/trix/pull/12)). Thanks [@ptrr](https://github.com/ptrr)!
- 💪 Modify Gemspec to support Rails 6 ([#17](https://github.com/kylefox/trix/pull/17)). Thanks [@afomera](https://github.com/afomera)!
- 💪 Bump to version 2.1.0

## 2.0.0

Released September 29, 2018

- ✅ Upgrade to [Trix 1.0.0](https://github.com/basecamp/trix/releases/tag/1.0.0) 🎉
- ☝️ Note: following this project's [versioning policy](https://github.com/kylefox/trix/issues/4), the major version for `trix-rails` is likewise bumped when Trix receives a major version bump.
- 🐛🔨 simple_form helper outputs hidden input tag before trix editor tag ([#10](https://github.com/kylefox/trix/pull/10)). Thanks [@bensie](https://github.com/bensie)!
- 💪 Add appraisals for Rails 5.2.1

## 1.0.1

Released September 20, 2018

- ✅ Upgrade to Trix 0.12.1.
- 🐛🔨 Formtastic helper outputs hidden input tag before trix editor tag ([#9](https://github.com/kylefox/trix/pull/9)). Thanks [@ch000](https://github.com/ch000)!

## 1.0.0

Released September 2, 2018

- ✅ Bumped to version 1.0.0 — `trix-rails` version numbers are now independent of [Trix](https://github.com/basecamp/trix) itself. See [this issue](https://github.com/kylefox/trix/issues/4) for more detail.
- ✅ Upgrade to Trix 0.12.0.
- ✅ Added support for Ruby 2.5.1.
- 🚫 Dropped support for Ruby 2.2.
- 🐛🔨 Allow additional options when using simple_form ([#8](https://github.com/kylefox/trix/pull/8)). Thanks [@phylor](https://github.com/phylor)!
