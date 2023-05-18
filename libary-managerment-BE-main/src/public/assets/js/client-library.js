// "start": "nodemon --exec babel-node src/app.js",
//"start": "json-server --watch db.json"

const btnLogOut = document.getElementById('logout-form');

const imgLibrary = document.querySelector('.img-library');
const divContent = document.querySelector('.content')

const management = document.querySelector('.management')

const onlineBorrow = document.querySelector('.online-borrow')

const listBookManagementHtmls = `<div class="list-book">
<div class="header-list-book">
    <div class="search-book">
        <p>Danh sách Sách</p>
        <div class="input-search">
            <input type="search" placeholder="Nhập tiêu đề..." class="search-title">
            <input type="search" placeholder="Nhập thể loại..." class="search-genre">
            <input type="search" placeholder="Nhập tên tác giả..." class="search-author">
        </div>
    </div>
    <div class="wrap-add-book">
        <button class="add-book">
            <p>Thêm sách</p>
        </button>
    </div>
</div>

<div class="content-list-book">
    <div class="property-book">
        <div id="book-id">
            <p>Mã sách</p>
        </div>
        <div id="title">
            <p>Tiêu đề</p>
        </div>
        <div id="author">
            <p>Tác giả</p>
        </div>
        <div id="genre-id">
            <p>Thể loại</p>
        </div>
        <div id="page">
            <p>Số trang</p>
        </div>
        <div id="publication">
            <p>Nhà xuất bản</p>
        </div>
        <div id="quantity">
            <p>Số bản</p>
        </div>
        <div id="delete-book">
            <p>Xóa</p>
        </div>
    </div>
</div>
</div>

<div class="element-add-book hidden">
        <i class="remove-add-book ti-close"></i>
        <p>Nhập thông tin sách</p>
        <div class="id-author">
            <input type="text" placeholder="Nhập mã sách..." class="bookId">
            <input type="text" placeholder="Nhập tên tác giả..." class="book-author">
        </div>
        <div class="title">
            <input type="text" placeholder="Nhập tiêu đề..." class="book-title">
        </div>

        <div class="genre-page">
            <input type="text" placeholder="Nhập tên thể loại..." class="book-genre-id">
            <input type="text" placeholder="Nhập số trang..." class="book-page">
        </div>

        <div class="publication-quantity">
            <input type="text" placeholder="Nhập tên nhà xuất bản..." class="book-publication">
            <input type="text" placeholder="Nhập số bản..." class="book-quantity">
        </div>
        <button class="submit-add-book">Thêm sách</button>
    </div>
`
const listBookBorrowHtmls = `<div class="list-book">
<div class="header-list-book">
    <div class="search-book">
        <p>Danh sách Sách</p>
        <div class="input-search">
            <input type="search" placeholder="Nhập tiêu đề..." class="search-title">
            <input type="search" placeholder="Nhập thể loại..." class="search-genre">
            <input type="search" placeholder="Nhập tên tác giả..." class="search-author">
        </div>
    </div>
</div>

<div class="content-list-book">
    <div class="property-book">
        <div id="book-id">
            <p>Mã sách</p>
        </div>
        <div id="title">
            <p>Tiêu đề</p>
        </div>
        <div id="author">
            <p>Tác giả</p>
        </div>
        <div id="genre-id">
            <p>Thể loại</p>
        </div>
        <div id="page">
            <p>Số trang</p>
        </div>
        <div id="publication">
            <p>Nhà xuất bản</p>
        </div>
        <div id="quantity">
            <p>Số bản</p>
        </div>
        <div id="borrow-book">
            <p>Mượn sách</p>
        </div>
    </div>
</div>
</div>

<div class="element-borrow-book hidden">
        <i class="remove-borrow-book ti-close"></i>
        <p>Thông tin sách mượn</p>
        <div class="borrow-book-name">
        </div>
        <input type="text" placeholder="Nhập mã sinh viên..." class="student-id">
        <input type="text" placeholder="Nhập tên sinh viên..." class="student-name">
        <input type="text" placeholder="Nhập số bản muốn mượn..." class="quantity-borrow-book">
        <input type="text" placeholder="Nhập thời hạn mượn(ngày)..." class="quantity-borrow-day">
        <button class="submit-borrow-book">Mượn sách</button>
</div>
`

let listItems = []
const listTitleBook = []
const listAuthorBook = []
const listGenreBook = []
let listID = []
let length

const booksApi = 'http://localhost:3000/books'

btnLogOut.onsubmit = function(event) {
    event.preventDefault();
    location.assign('./login.html')
}

management.onclick = function() {
    management.classList.add('active');
    onlineBorrow.classList.remove('active')
    renderBookManagement()
}

function renderBookManagement() {
    imgLibrary.classList.add('hidden')

    divContent.innerHTML = listBookManagementHtmls;
    
    getDataFromBublicAPI()
}


async function getDataFromBublicAPI() {
    const responseAPI = await fetch(booksApi)
    const datas = await responseAPI.json();
    const listDataBook = document.querySelector('.content-list-book');
    const btnBorrowBook = document.querySelector('#borrow-book')
    datas.forEach((data) => {
        const bookId = data.book_id
        const bookIdItem = document.createElement('div');
        listItems.push(bookIdItem)
        if(!listID.includes(data.book_id)) {    
            listID.push(data.book_id)
        }
        bookIdItem.className = `list-content-book content-book-item-${data.id}`;
        if(btnBorrowBook) {
            bookIdItem.innerHTML = `
        <div class="${data.book_id}">
            <p>${data.book_id}</p>
        </div> 
        <div class="list-title-book-${data.book_id}">
            <p>${data.book_name}</p>
        </div> 
        <div class="list-author-book-${data.book_id}">
            <p>${data.author}</p>
        </div> 
        <div class="list-genre-book-${data.book_id}">
            <p>${data.genre_id}</p>
        </div> 
        <div class="list-page-book-${data.book_id}">
            <p>${data.page_book}</p>
        </div> 
        <div class="list-publication">
            <p>${data.publication}</p>
        </div> 
        <div class="list-quantity-book-${data.book_id}">
            <p>${data.quantity}</p>
        </div> 
        <div class="list-condition-book">
            <button class="btn-borrow-book" onclick="handleBorrowBook(${data.book_id}, ${data.id})"><i class="ti-hand-point-up"></i></button>
        </div>  
        `
        } else {
            bookIdItem.innerHTML = `
        <div class="${data.book_id}">
            <p>${data.book_id}</p>
        </div> 
        <div class="list-title-book-${data.book_id}">
            <p>${data.book_name}</p>
        </div> 
        <div class="list-author-book-${data.book_id}">
            <p>${data.author}</p>
        </div> 
        <div class="list-genre-book-${data.book_id}">
            <p>${data.genre_id}</p>
        </div> 
        <div class="list-page-book-${data.book_id}">
            <p>${data.page_book}</p>
        </div> 
        <div class="list-publication">
            <p>${data.publication}</p>
        </div> 
        <div class="list-quantity-book-${data.book_id}">
            <p>${data.quantity}</p>
        </div> 
        <div class="list-condition-book">
            <button class="btn-delete-book" onclick="handleDeleteBook(${data.id}, ${bookId})">&times;</button>
        </div>  
        `
        }
        
        listDataBook.appendChild(bookIdItem)
    });
    const btnAddBook = document.querySelector('.add-book')
    length = listID.length;
    //set css lại khi length thay đổi
    if(length < 3) {
        Object.assign(btnAddBook.style, {
            margin: '10px 0 0 0'
        });
    }
    //search tittle
    const searchTitle = document.querySelector('.search-title')
    searchTitle.onclick = function() {
        listID.forEach((id) => {
            const titleBook = document.querySelector(`.list-title-book-${id}`)
            listTitleBook.push(titleBook)
        })
        searchTitle.addEventListener('input', (e) => filerInput(e.target.value, listTitleBook))
    }
    //search author
    const searchAuthor = document.querySelector('.search-author')
    searchAuthor.onclick = function() {
        listID.forEach((id) => {
            const authorBook = document.querySelector(`.list-author-book-${id}`)
            listAuthorBook.push(authorBook)
        })
        searchAuthor.addEventListener('input', (e) => filerInput(e.target.value, listAuthorBook))  
    }
    //search genre
    const searchGenre = document.querySelector('.search-genre')
    searchGenre.onclick = function() {
        listID.forEach((id) => {
            const genreBook = document.querySelector(`.list-genre-book-${id}`)
            listGenreBook.push(genreBook)
        })
        searchGenre.addEventListener('input', (e) => filerInput(e.target.value, listGenreBook))
    }
    //add book
    if(btnAddBook) {
        btnAddBook.onclick = function() {
            handleAddBook(listDataBook)
        }
    }
}

function filerInput(keySearch, listSearch) {
    const searchTerm = keySearch.toLowerCase()
    const searchTermConvertEnglish = removeVietnameseTones(searchTerm)
    for(let i = 0; i < listSearch.length; i++) {
        let searchItemConvertEnglish = removeVietnameseTones(listSearch[i%length].innerText.toLowerCase())
        if(searchItemConvertEnglish.includes(searchTermConvertEnglish)) {
            listItems[i%length].classList.remove('hidden')
        } else {
            listItems[i%length].classList.add('hidden')
        }
    } 
}

function handleAddBook(listDataBook) {
    const btnAddBook = document.querySelector('.add-book')
    const elementAddBook = document.querySelector('.element-add-book');
    const elementSubmitAddBook = document.querySelector('.submit-add-book');
    const btnRemoveAddBook = document.querySelector('.remove-add-book');

    btnRemoveAddBook.onclick = function() {
        elementAddBook.classList.add('hidden')
        valueID.value = ''
        valueTitle.value = ''
        valueGenre.value = ''
        valueAuthor.value = ''
        valuePage.value = ''
        valuePublication.value = ''
        valueQuantity.value = ''
    }
    
    const valueID = document.querySelector('.bookId');
    const valueAuthor = document.querySelector('.book-author')
    const valueTitle = document.querySelector('.book-title')
    const valueGenre = document.querySelector('.book-genre-id')
    const valuePage = document.querySelector('.book-page')
    const valuePublication = document.querySelector('.book-publication')
    const valueQuantity = document.querySelector('.book-quantity')

    elementAddBook.classList.remove('hidden')
    valueID.focus()

    elementSubmitAddBook.onclick = function() {
        if(listID.includes(Number(valueID.value))) {
            alert('Mã sách đã tồn tại, vui lòng nhập lại!')
            valueID.focus()
        }else {
            if(!(Number(valuePage.value) > 0)) {
                alert('Nhập số trang không chính xác!')
                valuePage.focus()
            }
            else if(!(Number(valueQuantity.value) > 0)) {
                alert('Nhập số bản không chính xác!')
                valueQuantity.focus()
            } else {
                const data = {
                    book_id: Number(valueID.value),
                    book_name: valueTitle.value,
                    genre_id: valueGenre.value,
                    author: valueAuthor.value,
                    page_book: Number(valuePage.value),
                    publication: valuePublication.value,
                    quantity: Number(valueQuantity.value)
                }
                const options = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                }
                fetch(booksApi, options)
                .then(response => response.json())
                .then((function(response) {
                    const createBookItem = document.createElement('div');
                    createBookItem.className = `list-content-book content-book-item-${response.id}`;
                    createBookItem.innerHTML = `
                    <div class="${response.book_id}">
                        <p>${response.book_id}</p>
                    </div> 
                    <div class="list-title-book-${response.book_id}">
                        <p>${response.book_name}</p>
                    </div> 
                    <div class="list-author-book-${response.book_id}">
                        <p>${response.author}</p>
                    </div> 
                    <div class="list-genre-book-${response.book_id}">
                        <p>${response.genre_id}</p>
                    </div> 
                    <div class="list-page-book">
                        <p>${response.page_book}</p>
                    </div> 
                    <div class="list-publication">
                        <p>${response.publication}</p>
                    </div> 
                    <div class="list-quantity-book">
                        <p>${response.quantity}</p>
                    </div> 
                    <div class="list-condition-book">
                        <button class="btn-delete-book" onclick="handleDeleteBook(${response.id}, ${response.book_id})">&times;</button>
                    </div>  
                    `
                    listDataBook.appendChild(createBookItem)
                    listID.push(response.book_id)
                    valueID.value = ''
                    valueTitle.value = ''
                    valueGenre.value = ''
                    valueAuthor.value = ''
                    valuePage.value = ''
                    valuePublication.value = ''
                    valueQuantity.value = ''
                }))
                .catch((err) => {
                    alert(err)
                })
                elementAddBook.classList.add('hidden')
            }
        }
    }
}
    
function handleDeleteBook(id, bookId) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
    }
    fetch(booksApi + '/' + id, options)
    .then(response => response.json())
    .then(function() {
        const contentBookItem = document.querySelector(`.content-book-item-${id}`)
        if(contentBookItem) {
            contentBookItem.remove();
        }
        //Xóa ID trong listID sau khi xóa book
        listID.forEach(function(item, index) {
            if(item === bookId) {
                listID.splice(index, 1)
            }
        })
    })
    .catch((err) => {
        alert(err)
    })
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

onlineBorrow.onclick = function() {
    management.classList.remove('active');
    onlineBorrow.classList.add('active')
    renderBookBorrow()
}

function renderBookBorrow() {
    imgLibrary.classList.add('hidden')

    divContent.innerHTML = listBookBorrowHtmls;
    
    getDataFromBublicAPI()
}

function handleBorrowBook(bookId, id) {
    //xóa hidden
    const elementBorrowBook = document.querySelector('.element-borrow-book')
    elementBorrowBook.classList.remove('hidden')
    //click tắt thì thêm hidden
    const btnRemoveBorrowBook = document.querySelector('.remove-borrow-book');
    btnRemoveBorrowBook.onclick = function() {
        elementBorrowBook.classList.add('hidden')
    }
    //lấy tên sách
    const borrowBookName = document.querySelector('.borrow-book-name')
    const bookName = document.querySelector(`.list-title-book-${bookId}`).innerText
    const bookNameHtmls = `
    <h1>Tên sách: </h1>
    <h2>${bookName}</h2>
    `
    borrowBookName.innerHTML = bookNameHtmls
    //Xử lí sửa số lượng
    const idBorrowBook = document.querySelector('.student-id')
    const nameBorrowBook = document.querySelector('.student-name')
    const quantityBorrowDay = document.querySelector('.quantity-borrow-day')
    const submitBorrowBook = document.querySelector('.submit-borrow-book')
    let quantityBook = document.querySelector(`.list-quantity-book-${bookId}`)
    //Check số lượng = 0 trước
    if(Number(quantityBook.innerText) === 0) {
        alert('Sách này đã hết, vui lòng chọn sách khác!')
        elementBorrowBook.classList.add('hidden')
    }
    submitBorrowBook.onclick = function() {
        if(Number(quantityBorrowBook.value) > Number(quantityBook.innerText)) {
            alert('Số lượng sách không đủ để mượn, vui lòng thử lại!')
            quantityBorrowBook.focus()
        } 
        else {
            let options
            if (Number(quantityBorrowBook.value) < Number(quantityBook.innerText)) {
                options = {
                    method: 'PATCH',
                    body: JSON.stringify({
                        quantity: Number(quantityBook.innerText) - Number(quantityBorrowBook.value)
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                }
            } else {
                options = {
                    method: 'PATCH',
                    body: JSON.stringify({
                        quantity: 0
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                }
            }
            
            fetch(booksApi + '/' + id, options)
            .then(response => response.json())
            .then(function(data) {
                quantityBook.innerHTML = `<p>${data.quantity}</p>`
                elementBorrowBook.classList.add('hidden')
                quantityBorrowBook = ''
                quantityBorrowDay = ''
                alert('Mượn sách thành công!')
            })
            .catch((err) => {
                alert(err)
            })
        } 
    }
}





