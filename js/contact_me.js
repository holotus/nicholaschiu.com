$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // SEE: https://mandrillapp.com/api/docs/messages.JSON.html
            $.ajax({
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                type: "POST",
                data: {
                    "key": "gapuPWYuZAaq2zo1zv_fxw",
                    "message": {
                        // "html": "<p>Example HTML content</p>",
                        "text": message,
                        "subject": name,
                        "from_email": email,
                        "from_name": name,
                        "to": [
                            {
                                "email": "nicchiudesign@gmail.com",
                                "name": "Nic Chiu",
                                "type": "to"
                            }
                        ]//,
                        // "headers": {
                        //     "Reply-To": email
                        // },
                        // "important": false,
                        // "track_opens": null,
                        // "track_clicks": null,
                        // "auto_text": null,
                        // "auto_html": null,
                        // "inline_css": null,
                        // "url_strip_qs": null,
                        // "preserve_recipients": null,
                        // "view_content_link": null,
                        // "bcc_address": "message.bcc_address@example.com",
                        // "tracking_domain": null,
                        // "signing_domain": null,
                        // "return_path_domain": null,
                        // "merge": true,
                        // "merge_language": "mailchimp",
                        // "global_merge_vars": [
                        //     {
                        //         "name": "merge1",
                        //         "content": "merge1 content"
                        //     }
                        // ],
                        // "merge_vars": [
                        //     {
                        //         "rcpt": "recipient.email@example.com",
                        //         "vars": [
                        //             {
                        //                 "name": "merge2",
                        //                 "content": "merge2 content"
                        //             }
                        //         ]
                        //     }
                        // ],
                        // "tags": [
                        //     "password-resets"
                        // ],
                        // "subaccount": "customer-123",
                        // "google_analytics_domains": [
                        //     "example.com"
                        // ],
                        // "google_analytics_campaign": "message.from_email@example.com",
                        // "metadata": {
                        //     "website": "www.example.com"
                        // },
                        // "recipient_metadata": [
                        //     {
                        //         "rcpt": "recipient.email@example.com",
                        //         "values": {
                        //             "user_id": 123456
                        //         }
                        //     }
                        // ],
                        // "attachments": [
                        //     {
                        //         "type": "text/plain",
                        //         "name": "myfile.txt",
                        //         "content": "ZXhhbXBsZSBmaWxl"
                        //     }
                        // ],
                        // "images": [
                        //     {
                        //         "type": "image/png",
                        //         "name": "IMAGECID",
                        //         "content": "ZXhhbXBsZSBmaWxl"
                        //     }
                        // ]
                    }
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
