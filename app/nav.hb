<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">Snoeien</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
            {{#each plants}}
            <li><a href="#cat-{{category}}">{{category}}</a></li>
            {{/each}}
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>