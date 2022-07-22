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
        // TampilkanTodos();
    });


    function TampilkanTodos() {
        $(todos).each((index, value) => {
            let text = `<div class="alert alert-success" role="alert">
            <h4 class="alert-heading">${value.aktivitas}</h4>
            <p>${value.waktu}</p>
            <hr>
            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary badge edit" data-edit="${index}" >Edit</button>
            <button class="btn btn-danger badge hapus" data-id="${index}">Hapus</button>
          </div>`;

            $('#tampil').append(text);
        })
    }

    $('.edit').click(function () {
        let tanggalEdit = $('#tanggal-edit');
        let todos = JSON.parse(localStorage.getItem("todos"));
        let dataId = $(this).attr('data-edit');
        var result = todos[dataId];
        tanggalEdit.val(result['waktu']);
        $('#kegiatan-edit').val(result['aktivitas']);
        $('.update').data('updateId', dataId);
        // console.log(result['waktu'], result['aktivitas']);
    })

    $('.update').on('click', () => {
        let kegiatanEdit = $('#kegiatan-edit').val();
        let waktuEdit = $('#waktu-edit').val();
        const todo = {
            waktu: waktuEdit,
            aktivitas: kegiatanEdit,
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();
    })

    $('.hapus').click(function () {
        let todos = JSON.parse(localStorage.getItem("todos"));
        let dataId = $(this).attr('data-id');
        let hasil = todos.splice(dataId, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();
    })

});
