async function addPostHandler(e){
    e.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim()
    const post_body = document.querySelector().value.trim('input[name="post-body"]');

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_body
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText)

    }
};

document.querySelector('.add-post').addEventListener('submit', addPostHandler);
