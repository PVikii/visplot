/**
 * Copyright (C) 2016-2018 Emanuel Gafton, NOT/ING.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See COPYING.md.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program (see LICENSE.md); if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place, Suite 330,
 * Boston, MA 02111-1307 USA.
 */

var driver;
$(document).ready(function () {
    driver = new Driver();
    helper.LogDebug("Drawing plot background...");
    driver.graph.drawBackground();
 
    $('#canvasFrame').toggle();
    helper.LogDebug("Disabling buttons until the necessary quantities have been calculated...");
    $('#planNight').prop("disabled", true);
    $('#pngExport').prop("disabled", true);
    $('#saveDoc').prop("disabled", true);
    $('#tcsExport').prop("disabled", true);

    /*
     Trigger for the "Set" current date button; this uses AJAX to call a Py script
     (through a PHP wrapper) that calculates the ephemerides, and on success it plots them.
     */
    $('#dateSet').click(function () {
        driver.BtnEvt_SetDate();
    });
      
    /*
     Trigger for the "Plot" targets button; this uses AJAX to call a Py script
     (through a PHP wrapper) that calculates the altitudes of the various targets at
     different times, and on success it plots them.
     */
    $('#plotTargets').click(function () {
        driver.RequestedScheduleType = 3;
        driver.BtnEvt_PlotTargets();
    });
    $('#planNight').click(function () {
        driver.RequestedScheduleType = ($('#planNight').val() === Driver.updSchedText) ? 1 : 2;
        driver.BtnEvt_PlotTargets();
    });
    
    driver.BindEvents();
    helper.LogEntry('Done.');
    
    helper.LogDebug("Calling ParseOBInfoIfAny()...")
    driver.ParseOBInfoIfAny();
    
    helper.LogDebug("Calling InitializeDate()...")
    driver.InitializeDate();
    
    setInterval(function() {
        driver.Callback_ShowCurrentTime();
    }, 5000);
});

