<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once "./src/base.php" ?>
    <title>Journal de 16h55</title>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Journal de 16h55</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon text-light"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/cats" data-route="/cats">Les Article</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    </header>
    <div class="d-flex justify-content-center align-items-center" id="main-content">
        <form action="#" id="myForm">
            <div class="d-flex flex-column justify-content-center align-items-center gap-1 p-1">
                <div class="d-flex flex-column">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                </div>
                <div class="d-flex flex-column">
                    <label for="password">PASSWORD</label>
                    <input type="password" name="password" id="password">
                </div>

                <input type="submit" value="M'inscrire">
                <div id="notification"></div>
            </div>
        </form>
        
    </div>
    <footer></footer>
</body>
<script src="/helpers/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</html>