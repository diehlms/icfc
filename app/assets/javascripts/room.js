$(function() {
    $("#new_room_message").on("ajax:success", function (){
        $(this).find("input[type='room_message_message_trix_input_room_message']").val("");
    });
});