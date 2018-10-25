function getArticles() {
    let Inquiry = JSON.stringify({ page: 1, sortField: "id", sortOrder: "asc", limit: 5 });
    document.body.innerHTML = "<input type=\"text\" value=\"1\" /><button type=\"button\" onclick=\"next()\">GO</button>";
    $.post('http://127.0.0.1:3000/api/articles/readall', Inquiry , (data) => {
        data.items.forEach((item) => {
            let comments = "";
            let article = "";
            item.comment.forEach((comment) => {
                comments += (
                    "<pre style=\"margin-left: 3em\">" +
                    "<br/>" + comment.date   +
                    "<br/>" + comment.text   +
                    "<br/>" + comment.author +
                    "<br/>" + "</pre>")
            });
            article += (
                "<br/>" + item.date   +
                "<br/>" + item.title  +
                "<br/>" + item.text   +
                "<br/>" + item.author +
                "<br/>" );
            document.body.innerHTML += article + comments;
        });
    });
}

function getArticlesNext() {
    let pagetogo = $("input:text").val();
    let Inquiry = JSON.stringify({ page: pagetogo, sortField: "id", sortOrder: "asc", limit: 5 });
    document.body.innerHTML = "<input type=\"text\" value=\"" + pagetogo + "\" /><button type=\"button\" onclick=\"next()\">GO</button>";
    $.post('http://127.0.0.1:3000/api/articles/readall', Inquiry , (data) => {
        data.items.forEach((item) => {
            let comments = "";
            let article = "";
            item.comment.forEach((comment) => {
                comments += (
                    "<pre style=\"margin-left: 3em\">" +
                    "<br/>" + comment.date   +
                    "<br/>" + comment.text   +
                    "<br/>" + comment.author +
                    "<br/>" + "</pre>")
            });
            article += (
                "<br/>" + item.date   +
                "<br/>" + item.title  +
                "<br/>" + item.text   +
                "<br/>" + item.author +
                "<br/>" );
            document.body.innerHTML += article + comments;
        });
    });
}
