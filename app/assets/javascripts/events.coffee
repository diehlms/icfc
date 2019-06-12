# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery -> 
    $('#event_start_time').datepicker
        dateFormat: 'yy-mm-dd'
    # $("#event_end_time").datepicker
    #     dateFormat: 'yy-mm-dd'