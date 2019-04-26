

var wall = 4;   

var path;

function getCoordsTowardsTarget(target_x, target_y, current_x, current_y) {
    path = [];

    findPaths(target_x, target_y);

    var idx = findCellInPath(current_x, current_y);


    var nextCell = findAdjacentCellThatsCloser(path[idx].x, path[idx].y, path[idx].d);

    return ({
        x: nextCell.x,
        y: nextCell.y
    })
}

function findPaths(end_x, end_y) {
    path = [];


    path.push({
        x: end_x,
        y: end_y,
        d: 0
    });

  
    for (var i = 0; i < path.length; i++) {
     

        checkNextCells(path[i].x, path[i].y, path[i].d);
    }
}

function checkNextCells(x, y, d) {
   
    let openCells = getOpenAdjacentCells(x, y);


    for (var i = 0; i < openCells.length; i++) {
        if (!isCellAlreadyInPath(openCells[i].x, openCells[i].y, d + 1)) {
            path.push({
                x: openCells[i].x,
                y: openCells[i].y,
                d: d + 1
            });
        }
    }
}

function isCellAlreadyInPath(x, y, d) {
    for (var i = 0; i < path.length; i++) {
        if (path[i].x == x && path[i].y == y && path[i].d <= d) {
            return true;
        }
    }
    return false;
}


function getOpenAdjacentCells(x, y) {
    let openCells = [];

    console.log("x: " + x + ", y: " + y);

    if (world[y + 1][x] < wall) {   // down
        openCells.push({
            x: x,
            y: (y + 1)
        });
    }

    if (world[y - 1][x] < wall) {   // up
        openCells.push({
            x: x,
            y: (y - 1)
        });
    }

    if (world[y][x - 1] < wall) {   // left
        openCells.push({
            x: (x - 1),
            y: y
        });
    }

    if (world[y][x + 1] < wall) {   // right
        openCells.push({
            x: (x + 1),
            y: y
        });
    }

    return openCells;
}


function findCellInPath(x, y) {
    for (var i = 0; i < path.length; i++) {
        if (path[i].x == x && path[i].y == y) {
            return i;
        }
    }
}


function getPathToTarget(x, y) {
    var shortestPath = [];
    var i = findCellInPath(x, y);
    var dist = path[i].d;

    shortestPath.push({
        x: x,
        y: y,
        d: dist
    })

    

    while (dist > 0) {
        i = findAdjacentCellThatsCloser(path[i].x, path[i].y, path[i].d);

        shortestPath.push({
            x: path[i].x,
            y: path[i].y,
            d: path[i].d
        });

        dist = path[i].d;
    }

    return shortestPath;
}

function findAdjacentCellThatsCloser(x, y, d) {
    let adjCells = getOpenAdjacentCells(x, y);

   

    for (var i = 0; i < path.length; i++) {
        for (var j = 0; j < adjCells.length; j++) {
            if (path[i].x == adjCells[j].x
                && path[i].y == adjCells[j].y
                && path[i].d == d - 1) {
                return path[i];
            }
        }
    }
}