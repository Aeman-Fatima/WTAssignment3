$(function () {
    loadMembers();
    $("#faculty").on("click", ".btn-delete", handleDelete);
    $("#faculty").on("click", ".btn-edit", handleUpdate);
    $("#addBtn").click(addMember);
    $("#updateSave").click(function () {

        var id = $("#updateId").val();
        var idts = $("#updateIdts").val();
        var name = $("#Uname").val();
        var gender = $("#Ugender").val();
        var age = $("#Uage").val();
        var email = $("#Uemail").val();
        var country = $("#Ucountry").val();
        var city = $("#Ucity").val();
        var street_address = $("#Ustreet_address").val();
        var address = { country: country, city: city, street_address: street_address };
        var course_code = $("#Ucourse_code").val();

        var k;
        var arr = [];
        var input = document.getElementsByName('Uphone_numbers');
        for (var i = 0; i < input.length; i++) {
            var a = input[i];
            k = a.value;
            arr[i] = k;
            console.log(a.value);
        }
        phone_numbers = arr;

        var tosend = JSON.stringify({
            idts,
            name,
            gender,
            age,
            email,
            address,
            course_code,
            phone_numbers,
        });
        $.ajax({
            url: "http://localhost:3000/" + id,
            headers: { "Content-Type": "application/json" },
            dataType: "json",
            data: tosend,
            method: "PUT",
            success: function (response) {
                console.log(response);
                loadMembers();
                $("#updateModal").modal("hide");
            },
        });
    });
});

function addInput() {
    var new_input = '<div class="remove"><input type="text" class="form-control width" name="phone_numbers" id="phone_numbers" aria-describedby="phone_numbersHelp" placeholder="Phone number" /><button onclick="remove(event)" class="btnx" style="color:red">x</button></div>';
    $('#new_chq').append(new_input);
}
function addUInput(n) {
    var new_input = '<div class="remove"><input type="text" class="form-control width" name="Uphone_numbers" id="Uphone_numbers" aria-describedby="phone_numbersHelp" value="' + n + '" /><button onclick="remove(event)" class="btnx" style="color:red">x</button></div>';
    $('#new_chqU').append(new_input);
}
function addUInputEmpty() {
    var new_input = '<div class="remove"><input type="text" class="form-control width" name="Uphone_numbers" id="phone_numbers" aria-describedby="phone_numbersHelp" placeholder="Phone number" /><button onclick="remove(event)" class="btnx" style="color:red">x</button></div>';
    $('#new_chqU').append(new_input);
}

function remove(e) {
    e.target.parentNode.remove();
}

function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    $.get("http://localhost:3000/" + id, function (response) {

        $("#updateId").val(response.id);
        $("#Uname").val(response.name);
        $("#Ugender").val(response.gender);
        $("#Uage").val(response.age);
        $("#Uemail").val(response.email);
        $("#Ucountry").val(response.address.country);
        $("#Ucity").val(response.address.city);
        $("#Ustreet_address").val(response.address.street_address);
        $("#Ucourse_code").val(response.course_code);
        // $("#Uphone_numbers").val(response.phone_numbers);
        console.log(response.phone_numbers);
        $('#new_chqU').empty();

        arr = response.phone_numbers;
        for (var i = 0; i < arr.length; i++) {
            addUInput(arr[i]);
            $("Uphone_numbers").append(arr[i]);
            console.log(arr[i])
        }
        $("#updateModal").modal("show");

    });
}


function addMember() {
    var idts = $("#idts").val();
    var name = $("#name").val();
    var gender = $("#gender").val();
    var age = $("#age").val();
    var email = $("#email").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var street_address = $("#street_address").val();
    var address = { country: country, city: city, street_address: street_address };
    var course_code = $("#course_code").val();
    // var phone_numbers = $("#phone_numbers").val();
    // phone_numbers = phone_numbers.split(",");

    var k;
    var arr = [];
    var input = document.getElementsByName('phone_numbers');
    for (var i = 0; i < input.length; i++) {
        var a = input[i];
        k = a.value;
        arr[i] = k;
        console.log(a.value);
    }
    phone_numbers = arr;

    var tosend = JSON.stringify({
        idts,
        name,
        gender,
        age,
        email,
        address,
        course_code,
        phone_numbers,
    });
    //console.log("Sending data" +tosend);
    //console.table(tosend);
    $.ajax({
        url: "http://localhost:3000",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        dataType: "json",
        data: tosend,
        success: function (response) {
            console.log(response);
            $("#idts").val("");
            $("#name").val("");
            $("#gender").val("");
            $("#age").val("");
            $("#email").val("");
            $("#country").val("");
            $("#city").val("");
            $("#street_address").val("");
            $("#course_code").val("");
            $("#phone_numbers").val("");
            loadMembers();
            $("#addModal").modal("hide");
        },
    });
}
function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "http://localhost:3000/" + id,
        method: "DELETE",
        success: function () {
            loadMembers();
        },
    });
}
function loadMembers() {
    $.ajax({
        url: "http://localhost:3000",
        method: "GET",
        error: function (response) {
            var faculty = $("#faculty");
            faculty.html("An Error has occured");
        },
        success: function (response) {
            console.log(response);
            var faculty = $("#faculty");
            faculty.empty();
            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                numbers = rec.phone_numbers;
                faculty.append(
                    `<div class="member" data-id="${rec.id}"><h2>${rec.idts}</h2><h4>${rec.name}</h4><p><button class="btn btn-delete btn-sm float-right">delete</button><button class="btn btn-edit btn-sm float-right">Edit</button><b>Age:</b> ${rec.age} <br> <b>Gender:</b> ${rec.gender}</br><b>Email:</b> ${rec.email}</br><b>Address:</b><div class="address"><br>${rec.address.country},</br> ${rec.address.city}, ${rec.address.street_address}.</div></br><b>Phone nunbers:</b> ${numbers}</br><b>Course Code:</b> ${rec.course_code}</p></p></div>`
                );
                // faculty.append("<div><h3>" + rec.title + "</h3></div>");
            }
        },
    });
}
