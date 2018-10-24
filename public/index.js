function getArticles() {
    let Inquiry = JSON.stringify({ page: 1, sortOrder: "desc", limit: 5 });
    document.body.innerHTML = "<input type=\"text\" value=\"1\" /><button type=\"button\" onclick=\"next()\">GO</button>";
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
    let pagetogo = $("input:text").val();
    let Inquiry = JSON.stringify({ page: pagetogo, sortOrder: "desc", limit: 5 });
    document.body.innerHTML = "<input type=\"text\" value=\"" + pagetogo + "\" /><button type=\"button\" onclick=\"next()\">GO</button>";
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
