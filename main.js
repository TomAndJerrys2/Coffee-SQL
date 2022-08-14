// Main file that connects the window to other windows

// Dependencies
const electron = require("electron")
const url = require("url")
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;
let MainWindow;
let dbWindow;

// On Ready
app.on("ready", function() {
    // Creates new window
    MainWindow = new BrowserWindow({ 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: true
        }
    });
    // Load Main HTML File
    MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "MainScreen.html"),
        protocol: "file",
        slashes: true
    }));
    // If Main window is closed, Close all other windows too
    MainWindow.on("closed", function() {
        app.quit();
    });

    const MainMenu = Menu.buildFromTemplate(TopBarTemplate);
    Menu.setApplicationMenu(MainMenu);
});

function connectToDatabaseViewer() {
    // Regular settings
    dbWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
        width: 500,
        height: 500,
        title: "Connect to Database"
    });
    // load the main page
    dbWindow.loadURL(url.format({
        pathname: path.join(__dirname, "DbViewer.html"),
        protocol: "file",
        slashes: true
    }));
    // Just for some extra performance when its closed (Garbage collection)
    dbWindow.on("close", function() {
        dbWindow = null;
    });
}

const TopBarTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Connect",
                click() {
                    connectToDatabaseViewer();
                }
            }
        ]
    }
];