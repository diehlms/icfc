# typed: true
# frozen_string_literal: true

module ApplicationHelper
  def nav_link(label, path, small: false)
    active = current_page?(path)
    css = [
      'block px-3 rounded hover:bg-emerald-800 text-emerald-200',
      small ? 'py-1.5 text-sm' : 'py-2',
      active ? 'bg-emerald-800 text-white font-medium' : ''
    ].join(' ')
    link_to label, path, class: css
  end

  def required_mark
    content_tag(:span, " *", class: "text-red-500 ml-0.5", aria: { hidden: "true" })
  end

  def breakfast_today
    case Date.today.wday
    when 2, 4, 6 then 'Egg Day'
    when 1, 5    then 'Pancake Day'
    when 3       then 'French Toast Day'
    when 0       then 'Sunday Brunch'
    end
  end
end
