async function editPostHandler(e){
    e.preventDefault();

    const post_title = document.querySelector().value.trim();
    const post_body = document.querySelector().value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString.split('/').length -1
    ];

    if(comment_text){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector().addEventListener('submit', editPostHandler)