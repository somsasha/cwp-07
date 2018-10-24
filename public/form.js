function createNewArticle() {
    let author = document.getElementById('Author').value;
    let title = document.getElementById('Title').value;
    let text = document.getElementById('Text').value;
    let obj = JSON.stringify({ author: author, title: title, text: text});
    $.post("http://127.0.0.1:3000/api/articles/create", obj, (data) => { document.body.innerHTML += ("Create")});
}