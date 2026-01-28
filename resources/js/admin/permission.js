import $ from 'jquery';

$(document).on('change', '.perm-checkbox', function() {
    let permissionId = $(this).val();
    let roleId = $(this).data('role');
    let isChecked = $(this).is(':checked');

    $.ajax({
        url: "/permission-role/store",
        type: "POST",
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            permission_id: permissionId,
            role_id: roleId,
            checked: isChecked ? 1 : 0
        },
        success: function(res) {
            console.log(res.message);
        },
        error: function(err) {
            console.error(err.responseJSON);
        }
    });
});