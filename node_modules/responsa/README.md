# responsa
The grid system to designers free to create and developers free to responsive easily

#Designers free to create, Developers free to responsive easily

#Simple and real workflows to modern and pixel-perfect apps
But how this works?

1) Designers can be frameworks-grid free<br />
2) Fron-End developers can set customs grid exactly within Photoshop pixel sizes<br />
3) After be prepocessed, your custom grid will be all converted to responsive format<br />

#Example

##app.styl
<pre>
.container
    container(1024px)

.col-left
    float left      
    column(200px)
    
.col-right
    float left
    column(824px, col: 'last')
</pre>


##app.css
<pre>
.container {
    margin: 0 auto;
    max-width: 1024px;
}

.container .col-left {
    float: left;
    max-width: 17.578125%;
    margin-right: 1.953125%;
}

.col-right {
    float: left;
    max-width: 78.515625%;
    margin-right: 0;
}
</pre>