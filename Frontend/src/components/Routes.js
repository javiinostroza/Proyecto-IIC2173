const base_url = "https://www.tuchat-backend5.cf/"
// const base_url = "http://localhost:3000/"
const url_anon_user = base_url + "users/?anon=true"
//const url_named_user = base_url + "users/?username="
const url_named_user = base_url + "users"
const url_login = base_url + "login/"
const url_rooms = base_url + "rooms"
const url_add_room = base_url + "rooms/?name="
const url_display_chat = base_url + "rooms/"
const url_send_message = base_url + "sendmessage"
const url_change_email = base_url + "change_email"
const url_download_chat = base_url + "getroommessagesonpdf?room_id="
const url_upload_photo = base_url + "uploadphoto?username="
const url_auth = "https://tuchat.cf/"
// const url_auth = "http://localhost:3001/"
const url_auth_test = url_auth + "test"
const url_upload_file = base_url + "upload"
const url_requests = base_url + "requests"
const url_request_accept = base_url + "acceptrequest"

const url_delete_all_messages = base_url + "room_messages/"
const url_delete_room = base_url + "rooms/"
const url_delete_a_message = base_url + "room_messages/"
const url_edit_a_message = base_url + "room_messages/"
const url_get_old_message = base_url + "room_messages/"

const url_get_monitoring = base_url + "monitoring"
const url_get_ec2_info = base_url + "monitoring_ec2"
const url_get_s3_info = base_url + "monitoring_s3"
const url_get_elb_info = base_url + "monitoring_elb"

export {
    url_anon_user, 
    url_named_user, 
    url_login, 
    url_rooms, 
    url_add_room, 
    url_display_chat, 
    url_send_message, 
    url_change_email,
    url_download_chat,
    url_upload_photo,
    url_auth,
    url_auth_test,
    url_requests,
    url_request_accept,
    url_upload_file,
    url_delete_all_messages,
    url_delete_room,
    url_delete_a_message,
    url_edit_a_message,
    url_get_old_message,
    url_get_monitoring,
    url_get_ec2_info,
    url_get_s3_info,
    url_get_elb_info
};