module.exports = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Layout</title>

    <style type="text/css">
        * {
            margin: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        
        #header nav {
            display: flex;
            border: 1px solid #ccc;
            border-top: 0;
        }
        
        #header nav a {
            flex: 1;
            color: #666;
            font-weight: 900;
            text-align: center;
        }
        
        #header nav a + * {
            border-left: 1px solid #ccc;
        }
        
        #footer {
            height: 30px;
            line-height: 30px;
            padding-bottom: 10px;
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
        
        #pagelet-0 {
            height: 300px;
            background: #ccc;
            text-align: center;
        }
        
        #pagelet-1 {
            background: deepskyblue;
            height: 200px;
        }
        
        .pagelet {
            background: pink;
        }
    </style>
    <script type="text/javascript">
        function insertPagelet(pagelet) {
            pagelet = pagelet || {};
            document.getElementById(pagelet.id).innerHTML = pagelet.html;
            pagelet.done && pagelet.done(pagelet);
        }
    </script>
</head>

<body>

    <header id="header" class="container">
        <nav>
            <a>Home</a>
            <a>Link</a>
            <a>Link</a>
            <a>Link</a>
            <a>Link</a>
            <a>About</a>
        </nav>
    </header>

    <div>
        <div id="pagelet-0">
            Block-0
        </div>
        <div id="pagelet-1" class="pagelet">
            Block-1
        </div>
        <div id="pagelet-2" class="pagelet">
            Block-2
        </div>
    </div>

    <footer id="footer" class="container">
        Copyright &copy; baidu inc.
    </footer>
</body>`;