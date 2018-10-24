function getArticles() {
    let Inquiry = JSON.stringify({ page: 1, sortOrder: "desc", limit: 5 });
    //document.body.innerHTML = "<button id='next-button'>Next</button>";
    document.body.innerHTML = "<input type=\"button\" id=\"next-button\" value=\"Нажми меня\" />";
    $.post('http://127.0.0.1:3000/api/articles/readall', Inquiry , (data) => {
        data.items.forEach((item) => {
            document.body.innerHTML += (
                "<br/>" + item.date   +
                "<br/>" + item.title  +
                "<br/>" + item.text   +
                "<br/>" + item.author +
                "<br/>");
        });
    });
}

function getArticlesNext() {
    let Inquiry = JSON.stringify({ page: 2, sortOrder: "desc", limit: 5 });
    document.body.innerHTML = "<button id='next-button'>Next</button>";
    $.post('http://127.0.0.1:3000/api/articles/readall', Inquiry , (data) => {
        data.items.forEach((item) => {
            document.body.innerHTML += (
                "<br/>" + item.date   +
                "<br/>" + item.title  +
                "<br/>" + item.text   +
                "<br/>" + item.author +
                "<br/>");
        });
    });
}
