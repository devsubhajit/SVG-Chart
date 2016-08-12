document.getElementById('editOpen').onclick = function () {
    if (document.getElementById('editBox').offsetHeight === 0) {
        document.getElementById('editBox').style.height = 'auto';
        this.classList.add('active');
    } else if (document.getElementById('editBox').style.height === 'auto') {
        document.getElementById('editBox').style.height = 0 + 'px';
        this.classList.remove('active');
    }
};
document.getElementById('openhtml').onclick = function () {
    if (document.getElementById('htmlbox').offsetHeight === 0) {
        document.getElementById('htmlbox').style.height = 'auto';
        this.classList.add('active');
    } else if (document.getElementById('htmlbox').style.height === 'auto') {
        document.getElementById('htmlbox').style.height = 0 + 'px';
        this.classList.remove('active');
    }
};

var checkBox = document.getElementsByClassName('allCheck');
for (ci = 0; ci < checkBox.length; ci++) {
    var styleArrayTwo = [];
    checkBox[ci].onchange = function () {
        var styleValue = this.getAttribute('data-stylevalue');
        if (this.checked === true) {
            styleArrayTwo.push(styleValue);
        } else if (this.checked === false) {
            var indexStyle = styleArrayTwo.indexOf(styleValue);
            if (indexStyle > -1) {
                styleArrayTwo.splice(indexStyle, 1);
            }
        }
        document.getElementById('graphSubmit').onclick = function () {
            var lineColor = checkBox[2].value;
            var dotColor = document.getElementById('dot-color').value;
            var dotBorderWidth = document.getElementById('dot-border').value;
            var dotBorderColor = document.getElementById('dot-border-color').value;

            // ----------- gradiend colors 
            var gradeColorOne = document.getElementById('grade-color1').value;
            var gradeColorTwo = document.getElementById('grade-color2').value;



            styleArrayTwo.push('color:' + lineColor);
            if (document.getElementById('dots').checked === true) {
                styleArrayTwo.push('dot-style:' + dotColor);
                styleArrayTwo.push('dot-border:' + dotBorderColor + '-' + dotBorderWidth);
            }
            // gradient -------- color ----------
            if (gradeColorOne !== '#000000' || gradeColorTwo !== '#000000') {
                styleArrayTwo.push('gradient-colors:' + gradeColorOne + '-' + gradeColorTwo);
            }
            var finalStyle = styleArrayTwo.join(",");
            //console.log('finalStyle :: ', finalStyle);

            // -------------- background color
            var bgColor = document.getElementById('chart-background').value;
            var gridColor = document.getElementById('chart-grid').value;

            var mxvl = document.getElementById('maximum-value').value;
            var alvls = document.getElementById('all-values').value;

            if (mxvl === '' || alvls === '') {
                document.getElementById('popMessage').style.display = 'block';
                var msgp = document.createElement('p');
                var inputError = document.createTextNode("Please fill up the maximum value, exp :  1000, and all values like this :: 204 570 600 130 400");
                msgp.appendChild(inputError);
                document.getElementById('popmsgcont').appendChild(msgp);
                document.getElementById('okay').onclick = function () {
                    document.getElementById('popmsgcont').removeChild(msgp);
                    document.getElementById('popMessage').style.display = 'none';
                };
            }


            document.getElementById('maxValue').innerHTML = mxvl;
            document.getElementById('allValues').innerHTML = alvls;

            var graphBox = document.getElementsByClassName('viewport-product')[0];
            graphBox.setAttribute('data-graphbg', bgColor);
            graphBox.setAttribute('data-grid', gridColor);

            document.getElementById('htmlbox').innerHTML = "&lt;div data-graph='line' data-graphbg='" + bgColor + "' data-grid='" + gridColor + "' data-style='" + finalStyle + "'&gt;<br/>&lt;span class='ui-max-value'&gt;" + mxvl + "&lt;/span&gt;<br/>&lt;span class='ui-graph-values'&gt;" + alvls + "&lt;/span&gt;<br/>&lt;/div&gt;";

            var svg = document.getElementsByTagName('svg')[0];
            if (svg !== undefined) {
                graphBox.removeChild(svg);
            }
            graphBox.setAttribute('data-style', finalStyle);
            svgGrpah();

            var checkBoxAll = document.getElementsByClassName('allCheck');
            for (checki = 0; checki < checkBoxAll.length; checki++) {
                checkBoxAll[checki].checked = false;
            }
            styleArrayTwo = [];
        };
    };
}

