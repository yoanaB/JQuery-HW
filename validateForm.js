
$(window).ready(function () {
    var carArray = [];
    var car = {};

    function addCars() {
        $('.add-car-form').find('input').each(function (index) {
            car[$(this).attr('id')] = $(this).val();
        });
        carArray.push(car);
        localStorage.setItem('carArray', JSON.stringify(carArray));
    }

    var clicked = false;
    var count = 0;
    var numberRows = 0;

    $("#add-btn").click(function (event) {

        if(numberRows == 0){
            count = 0;
        }

        var year = $("#year").val();
        var mileage = $("#mileage").val();
        var isNaN = (NaN === (typeof year) || NaN === (typeof mileage));
        var isInt = (parseInt(year) - year === 0) && (parseInt(mileage) - mileage === 0);
        if (isNaN || !isInt) {
            if (!clicked) {
                $(".form-button").prev().append("<span id='warning'>" + "Please enter only integer values!" + "</span>");
                clicked = true;
            }
            event.preventDefault();
        }

        addCars();

        var item = localStorage.getItem('carArray');
        var object = JSON.parse(item);
        //console.log(object[count].brand);

        var tableRow = document.createElement('tr');
        $(tableRow).attr('id', count);
        var numberCell = document.createElement('td');
        $(numberCell).attr('class', 'count').text(count);
        $(tableRow).append(numberCell);
        var brandCell = document.createElement('td');
        $(brandCell).attr('class', 'brand').text(object[count].brand);
        $(tableRow).append(brandCell);
        var modelCell = document.createElement('td');
        $(modelCell).attr('class', 'model').text(object[count].model);
        $(tableRow).append(modelCell);
        var yearCell = document.createElement('td');
        $(yearCell).attr('class', 'year').text(object[count].year);
        $(tableRow).append(yearCell);
        var mileageCell = document.createElement('td');
        $(mileageCell).attr('class', 'mileage').text(object[count].mileage);
        $(tableRow).append(mileageCell);
        var actionCell = document.createElement('td');
        var removeElement = document.createElement('a');
        $(removeElement).attr({
            href: '#',
            class: 'remove'
        });
        var removeSpan = document.createElement('span');
        $(removeSpan).attr('class', 'glyphicon glyphicon-remove');
        $(removeElement).append(removeSpan);
        $(actionCell).attr('class', 'action');
        $(actionCell).append(removeElement);
        var editElement = document.createElement('a');
        $(editElement).attr({
            href: "#",
            class: "edit",
            /*data-toggle: "modal",
            data-target: "#addCar"*/
        });
        $(editElement).attr('data-toggle', 'modal');
        $(editElement).attr('data-target', '#edit-car');
        var editSpan = document.createElement('span');
        $(editSpan).attr('class', 'glyphicon glyphicon-pencil');
        $(editElement).append(editSpan);
        $(actionCell).append(editElement);
        $(tableRow).append(actionCell);
        $('tbody').append(tableRow);
        numberRows++;

        object[count].number = count;
        count++;

        $('.remove').on('click', function(event){
            var index = $(this).closest('tr').attr('id');
            var item = localStorage.getItem('carArray');
            var object = JSON.parse(item);
            $(this).closest('tr').remove();
            if(index == 0){
                object.slice(-1, 1);
            }
            object.slice(index, 1);
            console.log(object);
            localStorage.setItem('carArray', JSON.stringify(object));

            numberRows--;
            console.log(JSON.parse(localStorage.getItem('carArray')));
            event.preventDefault();
        });

        $('.edit').on('click', function(){
            var index = $(this).closest('tr').attr('id');
            var found = {};
            var foundIndex = -1;
            for(var i = 0; i < object.length; i++){
                if(object[i].number == index){
                    found = object;
                    foundIndex = i;
                    break;
                }
            }
            console.log(found);
            console.log(found[0].brand);
            $('#brand-edit').val(found[0].brand);
            $('#model-edit').val(found[0].model);
            $('#year-edit').val(found[0].year);
            $('#mileage-edit').val(found[0].mileage);
            $('#edit-btn').on('click', function(){
                object[foundIndex].brand = $('#brand-edit').val();
                object[foundIndex].model = $('#model-edit').val();
                object[foundIndex].year = $('#year-edit').val();
                object[foundIndex].mileage = $('#mileage-edit').val();
                console.log(object);
                localStorage.setItem('carArray', JSON.stringify(object));
                console.log(localStorage.getItem('carArray'));
                $('#' + index).find('.brand').text(object[foundIndex].brand);
                $('#' + index).find('.model').text(object[foundIndex].model);
                $('#' + index).find('.year').text(object[foundIndex].year);
                $('#' + index).find('.mileage').text(object[foundIndex].mileage);
            })

        })

        $('.add-car-form').trigger("reset");
        $('.add-car-form').find('#warning').remove();
    });

});
