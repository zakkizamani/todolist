$(document).ready(function () {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    TampilkanTodos();
    $('#kirim').on('click', function () {
        let tanggal = $('#tanggal').val();
        let kegiatan = $('#kegiatan').val();
        const todo = {
            waktu: tanggal,
            aktivitas: kegiatan,
            created_at: new Date().getTime()
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();
    });


    function TampilkanTodos() {
        $(todos).each((index, value) => {
            let text = `<div class="alert alert-success" role="alert">
            <h4 class="alert-heading">${value.aktivitas}</h4>
            <p>${value.waktu}</p>
            <hr>
            <button data-todo="${value.aktivitas}" class="btn btn-primary badge edit" data-edit="${index}">Edit</button>
            <button class="btn btn-danger badge hapus" data-id="${index}">Hapus</button>
          </div>`;

            $('#tampil').append(text);
        })
    }


    // belom bisa set data-updateId
    $('.edit').click(function () {
        $('#staticBackdrop').modal('show');
        let tanggalEdit = $('#tanggal-edit');
        let todos = JSON.parse(localStorage.getItem("todos"));
        let dataId = $(this).attr('data-edit');
        let datatodo = $(this).attr('data-todo');
        let inputHide = $('#inputHide').val(datatodo);
        var result = todos[dataId];
        tanggalEdit.val(result['waktu']);
        $('#kegiatan-edit').val(result['aktivitas']);
        console.log('data-todo ' + datatodo)

    })

    $('.btn-update').on('click', function () {
        // attribut data belom bisa menerima operan dari class .edit
        let dataUpdate = $('#inputHide').val();
        console.log(dataUpdate)
        let kegiatanEdit = $('#kegiatan-edit').val();
        let waktuEdit = $('#tanggal-edit').val();
        let objIndex = todos.findIndex((obj => obj.aktivitas == dataUpdate));

        todos[objIndex] = {
            waktu: waktuEdit,
            aktivitas: kegiatanEdit,
        }
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(objIndex)
        location.reload();

    })

    $('.hapus').click(function () {
        let todos = JSON.parse(localStorage.getItem("todos"));
        let dataId = $(this).attr('data-id');
        todos.splice(dataId, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();
    })

});
