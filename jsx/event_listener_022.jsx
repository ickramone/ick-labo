<javascriptresource>
<name>Script Events Listener...</name>
<category>scriptevents</category>
</javascriptresource>

var _version = "0.02";

var log_name = "~/Desktop/EventListener.log";

var max_data_len = 10000; // Trims data to this value if they are longer. For example, with toolRecording

var dsc_name = "d";
var lst_name = "list";
var ref_name = "r";

var dsc_numb = 0;
var lst_numb = -1;
var ref_numb = -1;

var tab = "    ";

var silent = false;

var events_CS6 = [ "All " ];

var events_CC = ["TdT ", "Avrg", "Asrt", "Fbrs", "HsbP", "LghE", "Pnt ", "TxtF", "Vrtn", "BacL", "FilE", "ColE", "OpnU", "VnPt", "LqFy",
"Illustrator Export.  This string makes me unique!",
"22C3EEBF-A978-4ca9-91DF-E4F0CCEE5ACE",
"733B7310-9259-48fd-8A07-24CF7521590D",
"4059cf7a-9304-11d3-bd8d-0060b0a13dc4",
"1CAB8255-B682-4EAD-8184-AC65030134D5",
"ffcb20ee-4c1f-11e5-885d-feff819cdc9f",
"12fb03a7-e9af-426a-8377-3d423d7303e6",
"8cba8cd6-cb66-11d1-bc43-0060b0a13dc4",
"0B71D221-F8CE-11d2-B21B-0008C75B322C",
"a0754df2-9c60-4b64-a940-6a2bb1102652",
"6f1c2cf5-4a97-4e32-8f59-f5d7a087adef",
"9AA9D7D6-C209-494A-CC01-4E7D926DA642",
"3caa3434-cb67-11d1-bc43-0060b0a13dc4",
"8a761c74-f362-4a1b-a3f7-e779ab319a08",
"e805a6ee-6d75-4b62-b6fe-f5873b5fdf20",
"CA37AEAF-6272-41F7-8258-F272711964E2",
"1F9021B1-5045-42E1-AE2A-7E504FAA8D50",
"cf34b502-2013-4d07-8431-1dfd634ee0cd",
"B20FB700-B96A-4C10-B666-8C9B9DEF594E",
"9AA9D7D6-C209-494A-BED9-4E7D926DA69F",
"08E8421B-976E-4E81-A964-AD754EDB4381",
"6F17BFA7-EFC8-40EA-B850-7B95ED8EA713",
"9D3174CE-045C-4B87-B7AE-40D8C3319780",
"0f9db13f-a772-4035-9020-840f0e5e2f02",
"808034C2-162D-481B-88D4-B3EF294EDE42",
"20489C30-9DB1-4DAD-B685-513A8C0543B9",
"SaveForWeb",
"Adobe Camera Raw Filter",
"CropPhotos0001",
"AdobeExposureMergeUI",
" JPEG 2000",
"CropPhotosAuto0001",
"AdobeScriptAutomation Scripts",
"WIAWizard0001",
"Adobe Camera Raw",
"export3DSingleMesh",
"set3DUnits",
"renderUVVertexColors",
"print3D",
"cancelPrint3D",
"print3DProperties",
"setPrint3DProperties",
"print3DUtilities",
"bake3DCrossSection",
"bakeFor3DPrinting",
"upload3DToSketchFab",
"set3DSkeletalAnimation",
"set3DFacialExpressionAnimation",
"GetBuiltInMixamoSearches",
"SearchMixamo",
"GetLastMixamoResults",
"GetMixamoThumbnailPath",
"ApplyMixamoPreset",
"GetMixamoParameters",
"SetMixamoParameter",
"sceneToGroup",
"set3DMeshGroupSwitch",
"set3DGroupSwitch",
"simplify3DModel",
"merge3DMaterials",
"repair3DModel",
"create3DFromDepthSolidExtrusion",
"create3DFromDepthTwoSidedSolidExtrusion",
"create3DFromRGBD",
"New3DRepoussePreset",
"Save3DRepoussePresets",
"Delete3DRepoussePreset",
"DeleteAll3DRepoussePresets",
"Restore3DRepoussePresets",
"Rename3DRepoussePresets",
"objectGroup",
"objectReorder",
"objectBake",
"replaceMesh",
"materialSwitch",
"objectUnGroup",
"objectInstance",
"objectReplicate",
"objectSceneNew",
"objectSceneNewFile",
"packTo3DGroundPlane",
"projectionPaintToggle",
"select3DInstances",
"select3DReference",
"center3DMesh",
"set3DPrintScale",
"add3DRigToMesh",
"convertJSONdescriptor",
"applyBrushFile",
"artboardFromLayerGroupEvent",
"artboardFromLayersEvent",
"brushSelectionModeAdd",
"brushSelectionModeRefine",
"brushSelectionModeReplace",
"brushSelectionModeSubtract",
"changePathDetails",
"clearAllGuides",
"clearCanvasGuides",
"clearSelectedArtboardGuides",
"conditional",
"convertColorToSpace",
"copyLayerCSS",
"copyLayerSVG",
"decoRenderFlame",
"decoRenderPictureFrame",
"decoRenderTree",
"definePatternFile",
"deleteTimeline",
"duplicateAudioClips",
"editArtboardEvent",
"enableExtendedNotification",
"fixMissingLinkedAssets",
"flushImageChangedEvents",
"focusMask",
"generate",
"generateAssets",
"generatorTrackingEnable",
"hitTest",
"jsonAction",
"collapseAllGroupsEvent",
"licensed",
"isolateLayers",
"deIsolateLayers",
"makerColorLookupLayerFromFile",
"makeFrameAnimation",
"makePatternLayerFromFile",
"makeTimeline",
"newArtboardGuidesFromTarget",
"newArtboardEvent",
"newDocPresetJSON",
"newGuideLayout",
"newGuidesFromTarget",
"nodeConnection",
"nodeMenuInitialize",
"nodeMenu",
"nodePluginInitialize",
"nodePlugin",
"oilPaint",
"packageFile",
"reorderFX",
"placedLayerConvertToEmbedded",
"placedLayerConvertToLinked",
"placedLayerEmbedAll",
"placedLayerRelinkToFile",
"placedLayerRelinkToLibraries",
"placedLayerReplaceMissing",
"placedLayerRevealInOS",
"placedLayerUpdateAllModified",
"placedLayerUpdateModified",
"progressFinish",
"progressStart",
"progressUpdate",
"pushToDesignLibraries",
"rasterizeAllPlaced",
"remapFonts",
"resetDocumentChanged",
"resolveFontsDialog",
"perspectiveWarpTransform",
"sanitizeFileForTemplate",
"saveBrushFile",
"sendLayerThumbnailToNetworkClient",
"sendLayerShapeToNetworkClient",
"sendDocumentInfoToNetworkClient",
"sendJSONToNetworkClient",
"setOverscrollMode",
"setPanZoom",
"setPlacedLayerComp",
"shapeClipboardOperation",
"smartBrushWorkspace",
"smartBrushClearSelectionEvent",
"smartBrushResetSelectionEvent",
"syncManageAcct",
"syncSettings",
"syncSettingsPush",
"syncSettingsPull",
"typekitMarketingDialog",
"textCharStyleImport",
"textPgphStyleImport",
"textLoadDefaultTypeStyles",
"textSaveDefaultTypeStyles",
"textThumbnail",
"textToClipboard",
"thumbnailStyleFile",
"timelineEnable3DTracksKeys",
"toolRecording",
"undoWhile3DPainting",
"unzip",
"writePatternToFile",
"FuntaFormat",
"exportDocumentAsFileTypePressed",
"exportSelectionAsFileTypePressed",
"exportDocumentAsDialog",
"exportSelectionAsDialog",
"framedGroupFromLayerGroupEvent",
"framedGroupFromLayersEvent",
"newFramedGroupEvent",
"editFramedGroupEvent",
"autoCutout",
"ImportPanorama",
"ExportPanorama",
"create3DFromPanorama",
"key3DState",
"key3DObjectSelect",
"keyGetSelected3DObject",
"MixamoNotifier",
"keyMapClass",
"adaptCorrectTones",
"autoFixCorrectTones",
"jumpto",
"setTimelineTransitionProperties",
"setVideoClipVideoProperties",
"setVideoClipAudioProperties",
"setAudioClipProperties",
"32BitPreviewOptions",
"set3DGlobalAmbient",
"set3DBackgroundType",
"set3DBackgroundCount",
"set3DDisableColorLinearization",
"add3DLayerFromFile",
"open3DLayerTexture",
"save3DTextures",
"export3DModel",
"createPathFrom3D",
"reload3DModel",
"toggle3DTexture",
"resumeFinal3DRender",
"render3DSelection",
"splitRepousseMesh",
"toggle3DTextures",
"create3DPostcard",
"create3DTiledPainting",
"createVolume",
"set3DLightImageType",
"insertGroundPlane",
"3DRenderQualityPaint",
"3DRenderQualityModel",
"3DRenderQualityARTDraft",
"3DRenderQualityARTFinal",
"renderUVWireframe",
"renderUVShaded",
"renderUVNormalMap",
"renderUVBrushStrokes",
"set3DCamera",
"set3DObjectPosition",
"set3DCrossSection",
"set3DLightMode",
"set3DRenderMode",
"set3DEngine",
"set3DPaintType",
"set3DTransferFunction",
"add3DView",
"delete3DView",
"add3DObjectPosition",
"delete3DObjectPosition",
"set3DLightSwitch",
"set3DLightPosition",
"set3DLightDirection",
"set3DLightType",
"set3DLightColor",
"set3DLightHotspotAngle",
"set3DLightFalloffAngle",
"set3DLightInnerRadius",
"set3DLightOuterRadius",
"set3DLightIntensity",
"set3DLightCastsShadowsSwitch",
"set3DLightAttenuationSwitch",
"set3DLightAttenuationType",
"set3DLightAttenuationCoeff",
"set3DLightSoftShadows",
"set3DMeshPosition",
"set3DGroupPosition",
"set3DMeshAlignmentEdges",
"set3DMeshAlignmentCenters",
"set3DMeshDistribution",
"set3DMeshSwitch",
"set3DMeshShadowCatcher",
"set3DMeshShadowOpacity",
"set3DMeshShadowCasting",
"set3DMeshShadowInvisible",
"set3DMaterialSwitch",
"set3DMaterialScalar",
"set3DMaterialColor",
"set3DMaterialTexturePath",
"set3DMaterialTextureInfo",
"set3DPaintFalloff",
"hideAll3DSelected",
"hideTop3DSelected",
"hide3DEnclosedOnly",
"revealAll3D",
"invert3DSelected",
"paint3DDiffuse",
"paint3DEnvironment",
"paint3DBump",
"paint3DSpecular",
"paint3DOpacity",
"paint3DShininess",
"paint3DSelfIllumination",
"paint3DReflection",
"paint3DNormal",
"renderSettings3D",
"reparameterize3DModel",
"create3DFromDepthPlane",
"create3DFromDepthTwoSidedPlane",
"create3DFromDepthCylinder",
"create3DFromDepthSphere",
"create3DFromRepousseText",
"create3DFromRepousseWorkPath",
"create3DFromRepousseSheetMask",
"create3DFromRepousseAISO",
"create3DFromRepousseSelection",
"createConstraintFromWorkPath",
"createConstraintFromSelection",
"repousseInflationSide",
"repousseBevelSide",
"repousseInflationHeight",
"repousseInflationAngle",
"repousseBevelWidth",
"repousseBevelAngle",
"repousseBevelCountour",
"repousseExtrusionHeight",
"repousseExtrusionXAngle",
"repousseExtrusionYAngle",
"repousseExtrusionXYAngle",
"repousseExtrusionScale",
"repousseExtrusionTwist",
"repousseExtrusionOrigin",
"repousseExtrusionTextureType",
"repousseExtrusionShear",
"repousseMeshQuality",
"repousseConstraintType",
"repousseConstraintHeight",
"repousseConstraintAngle",
"repousseConstraintSide",
"repousseConstraintDelete",
"repousseConstraintPosition",
"repoussePreset",
"repousseNewPaths",
"repousseLoadPresets",
"repousseReplacePresets",
"objectDelete",
"objectNew",
"objectRename",
"add3DLightsFromPreset",
"delete3DLightsPreset",
"addPathToRepousse",
"dropTo3DGroundPlane",
"replace3DLightsFromPreset",
"replace3DMaterialFromPreset",
"save3DLightsToPreset",
"select3DPaintable",
"browse3DOnline",
"autoHide3D",
"New3DMaterialPreset",
"Save3DMaterialPresets",
"Load3DMaterialPresets",
"Replace3DMaterialPresets",
"Delete3DMaterialPreset",
"DeleteAll3DMaterialPresets",
"Restore3DMaterialPresets",
"Rename3DMaterialPresets",
"addAudioClipsToTimeline",
"addClipsToTimeline",
"addLayerFromFile",
"addLayerFromViewlessDoc",
"addTimelineTransition",
"closeViewlessDocument",
"colorLookup",
"Dicom",
"getTransforms",
"GIFFormat",
"openViewlessDocument",
"ID",
"JPEGTileExport",
"NTSCColors",
"NTSC",
"PDFExport",
"PSOpenFileDialog",
"accentedEdges",
"adaptCorrect",
"addLayerTogroupByDrag",
"addNoise",
"add",
"addBlankVideoLayer",
"addTo",
"addVideoLayer",
"align",
"alignment",
"angledStrokes",
"animationFrameActivate",
"animationFrameExtendSelection",
"animationFramesFromLayers",
"animationFramesToLayers",
"animationMatchLayer",
"animationPasteFrames",
"animationSelectAll",
"animationTween",
"applyComp",
"applyImageEvent",
"applyImageStackPluginRenderer",
"applyLocking",
"apply",
"applyStyle",
"assignProfile",
"autoFixCorrect",
"bMPFormat",
"basRelief",
"batchFromDroplet",
"batch",
"surfaceBlur",
"blackAndWhite",
"blurEvent",
"blurMethod",
"blurMore",
"border",
"boxblur",
"brightnessContrast",
"brightnessEvent",
"bringToFront",
"canvasSize",
"centerCropMarks",
"chalkCharcoal",
"channelMixer",
"charcoal",
"chrome",
"clearBrushControls",
"clearEvent",
"clearRuler",
"clearStyle",
"clearWarning",
"close",
"clouds",
"colorBalance",
"colorHalftone",
"colorPalette",
"colorRange",
"colorSampler",
"coloredPencil",
"combine",
"conteCrayon",
"contract",
"convertMode",
"convertAnimation",
"convertTimeline",
"convertToProfile",
"copyBrushTexture",
"copyEffects",
"copyEvent",
"copyKeyframes",
"copyMerged",
"copyToLayer",
"countAuto",
"countClear",
"countAdd",
"countDelete",
"countMove",
"countColor",
"countGroupVisible",
"countGroupMarkerSize",
"countGroupFontSize",
"countRenameGroup",
"countAddGroup",
"countDeleteGroup",
"countSetCurrentGroup",
"craquelure",
"createDroplet",
"createDuplicate",
"Crop",
"crosshatch",
"crystallize",
"curves",
"customPattern",
"custom",
"cut",
"cutToLayer",
"cutout",
"darkStrokes",
"decontaminate",
"deInterlace",
"dePosterize",
"defineBrush",
"defineCustomShape",
"definePattern",
"defineSprayer",
"defringe",
"deleteAllAnnot",
"deleteAudioClips",
"deleteFrame",
"deleteMeasurements",
"delete",
"deleteTransitions",
"denoise",
"desaturate",
"deselect",
"despeckle",
"destWhiteMax",
"differenceClouds",
"diffuseGlow",
"diffuse",
"disable",
"disableLayerFX",
"disableLayerStyle",
"disableSingleFX",
"displace",
"distort",
"distortion",
"distribute",
"distribution",
"divide",
"documentTimelineSettings",
"Draw",
"dryBrush",
"duplicateFrame",
"duplicate",
"dustAndScratches",
"editComment",
"editInImageReady",
"editVariables",
"emboss",
"enable",
"equalize",
"exchange",
"excludeIntersection",
"expand",
"exportDataSet",
"exportMeasurements",
"export",
"exportTimelineComments",
"exposure",
"extractWorkArea",
"extrude",
"facet",
"Fade",
"feather",
"Fl  ",
"filmGrain",
"filter",
"findEdges",
"findReplace",
"flattenImage",
"Flip",
"floatWindow",
"fragment",
"fresco",
"gaussianBlur",
"get",
"glass",
"glowingEdges",
"gradientClassEvent",
"gradientMapEvent",
"grain",
"graphicPen",
"green",
"gridMinor",
"groupEvent",
"Grow",
"halftoneScreen",
"headlightsLog",
"headlightsInfo",
"healJPEG",
"healSelection",
"Hd  ",
"highPass",
"hueSaturation",
"imageSize",
"imageStackConvertSmartObject",
"importAnnots",
"importDataSets",
"import",
"importVideoTapestry",
"importVideoToLayers",
"inkOutlines",
"insertBlankFrame",
"interfaceIconFrameDimmed",
"interfaceWhite",
"interlace",
"interpolation",
"interpretFootage",
"intersect",
"intersectWith",
"inverse",
"invert",
"groupLayersEvent",
"ungroupLayersEvent",
"lensFlare",
"levels",
"liftWorkArea",
"lightFilterLightingEffects",
"lightFilterExtractLight",
"lightFilterExtractColor",
"lightFilterGradient",
"lightFilterGradientMagnitude",
"Lnk ",
"linkSelectedLayers",
"enableLayerLink",
"disableLayerLink",
"selectAllLayers",
"selectNoLayers",
"findLayers",
"showAlteredVideo",
"hideAlteredVideo",
"makeFramesFromLayers",
"makeLayersFromFrames",
"Mk  ",
"manual",
"matchColor",
"maximumQuality",
"maximum",
"measurementScale",
"measurementScaleMarker",
"median",
"menuItemClass",
"mergeAlignedLayers",
"mergeChannels",
"mergeLayersNew",
"mergeLayers",
"mergeSpotChannel",
"mergeVisible",
"mezzotint",
"minimum",
"mosaicPlugin",
"mosaic",
"motionBlur",
"move",
"moveAllTime",
"moveInTime",
"moveKeyframes",
"moveOutTime",
"moveStartTime",
"moveWorkArea",
"neonGlow",
"networkEventSubscribe",
"networkEventUnsubscribe",
"neutralizeColor",
"newPlacedLayer",
"Nxt ",
"nextFrame",
"nextKeyframe",
"notePaper",
"notify",
"null",
"oceanRipple",
"offset",
"Opn ",
"paintDaubs",
"paletteKnife",
"pasteEffects",
"pasteInto",
"pasteKeyframes",
"pasteOutside",
"paste",
"patchSelection",
"recomposeSelection",
"patchwork",
"perspectiveCrop",
"photoFilter",
"photocopy",
"pinch",
"placeEvent",
"placeMeasurementScaleMarker",
"placedLayerMakeCopy",
"placedLayerEditContents",
"placedLayerExportContents",
"placedLayerReplaceContents",
"plaster",
"plasticWrap",
"Ply ",
"playbackStrokeFromFile",
"pointillize",
"polar",
"posterEdges",
"posterization",
"posterize",
"previous",
"previousFrame",
"previousKeyframe",
"printOneCopy",
"print",
"profileToProfile",
"proofSetup",
"purge",
"quit",
"radialBlur",
"rasterizeAll",
"rasterizeLayer",
"vectorStrokeToFill",
"rasterizeLinked",
"rasterizePlaced",
"rasterize",
"rasterizeTypeLayer",
"rasterizeVideo",
"recapture",
"recordMeasurements",
"refineSelectionEdge",
"reloadFrame",
"removeBlackMatte",
"removeClipMotionProperties",
"removeLayerMask",
"removeWhiteMatte",
"rename",
"replaceColor",
"replaceFootage",
"replace",
"replaceAudioClip",
"replaceSubstitutes",
"resetFromComp",
"resetGPUStats",
"reset",
"resetDocumentFormatStr",
"resize",
"restoreAllFrames",
"restoreFrame",
"reticulation",
"revealAll",
"reverse",
"revert",
"rigidTransform",
"blurbTransform",
"ripple",
"rotateEventEnum",
"roughPastels",
"shapeBlur",
"save",
"scaleEffectsEvent",
"scaleKeyframes",
"select",
"selectSimilarLayers",
"selectiveColor",
"selectLinkedLayers",
"sendDocumentThumbnailToNetworkClient",
"separationSetup",
"set",
"setClipMotionProperties",
"setTransitionDuration",
"sharpenEdges",
"sharpenMore",
"sharpen",
"sharpness",
"shearEd",
"shear",
"showColorPicker",
"showFileBrowserPalette",
"showMiniBridge",
"Shw ",
"similar",
"smartBlur",
"smartSharpen",
"smoothness",
"smudgeStick",
"solarize",
"spatter",
"spellCheck",
"spherize",
"splitChannels",
"splitVideoLayer",
"sponge",
"sprayedStrokes",
"stainedGlass",
"stamp",
"getGPUStats",
"getGPUInfo",
"startPaintProfiling",
"startStrokeRecording",
"stopPaintProfiling",
"stopStrokeRecording",
"Stop",
"stroke",
"subtractFrom",
"subtract",
"sumie",
"supplementalCategories",
"systemCall",
"takeMergedSnapshot",
"takeSnapshot",
"targaFormat",
"target",
"texturizer",
"thresholdClassEvent",
"tiles",
"togglePalettes",
"tornEdges",
"traceContour",
"transform",
"Trap",
"trim",
"trimDocumentToWorkArea",
"twirl",
"underpainting",
"undoEvent",
"ungroup",
"unlink",
"unlinkSelectedLayers",
"unsharpMask",
"updateLayouts",
"updatePlacedLayer",
"vibrance",
"Wait",
"waterPaper",
"watercolor",
"Wave",
"Wnd ",
"workspaceMenu",
"zigZag",
"helpLauncher",
]

if (!arguments.length)
    {
    var events = (parseInt(app.version)==13)?events_CS6:events_CC;

    var d = new Window("dialog", "Event Listener " + _version)

    d.orientation = "row";
    d.spacing = 20;
    d.margins = 20;

    var b1 = d.add("button", undefined, "Enable");
    var b2 = d.add("button", undefined, "Disable");

    b1.onClick = function()
        {
        d.close();

        app.notifiers.removeAll();

        var file = new File($.fileName);

        for (var i = 0; i < events.length; i++) app.notifiers.add(events[i], file);

        app.notifiersEnabled = true;

        file = null;

        alert("Event Listener Enabled!", " ")
        }

    b2.onClick = function()
        {
        d.close();

        app.notifiersEnabled = false;
        app.notifiers.removeAll();

        alert("Event Listener Disabled!", " ")
        }

    d.show();
    }

if (arguments.length >= 2) main(arguments[0], arguments[1]);

//////////////////////////////////////////////////////////////////////////
function main()
    {
    try
        {
        var func_name = typeIDToStringID(arguments[1]);

        if (!func_name) func_name = typeIDToCharID(arguments[1]);

        if (func_name.toLowerCase().indexOf("modalstate")    >= 0) return;
        if (func_name.toLowerCase().indexOf("invokecommand") >= 0) return;
        if (func_name.toLowerCase().indexOf("togglebrushesflyout") >= 0) return;

        func_name = func_name.replace(/^\s+/g, "");
        func_name = func_name.replace(/\s+$/g, "");
        func_name = func_name.replace(/\s/g, "_");

        var msg = null;

        if (!silent)
            {
            msg = new Window("palette", "Event Listener", undefined, {independent:true} );
            msg.preferredSize.width = 150;
            msg.txt = msg.add("statictext", undefined, func_name);
            msg.show();
            }

        var file = new File(log_name);

        file.open("a");

        file.writeln("///////////////////////////////////////////////////////////////////////////////");
        file.writeln("(function " + func_name + "_" + Math.random().toString().substr(2) + "()");
        file.writeln(tab + "{");
        file.writeln(tab + "try {");
        file.writeln(parse_desc(arguments[0]));
        file.writeln(tab + tab + "executeAction(" + k2s(arguments[1]) + ", d, DialogModes.NO);");
        file.writeln(tab + tab + "}");
        file.writeln(tab + "catch (e) { if (e.number!=8007) { alert(\"Line: \"+e.line+\"\\n\\n\"+e,\"Bug!\",true); throw(e); } }");


        file.writeln(tab + "}");
        file.writeln(")();");
        file.writeln("");

        file.close();

        if (msg)
            {
            msg.close();
            msg = null;
            }
        }
    catch (e) { _alert(e); }
    }

//////////////////////////////////////////////////////////////////////////
function _alert(e)
    {
    if (e.number != 8007)
        {
        alert("Line: " + e.line + "\n\n" +  e, "Bug!", true);
        }
    }

//////////////////////////////////////////////////////////////////////////
function enable_notifier(event_name, script_name, event_class)
    {
    try
        {
        for (var i = 0; i < app.notifiers.length; i++)
            {
            if (app.notifiers[i].event == event_name &&
                File(app.notifiers[i].eventFile).fsName.toLowerCase() == File(script_name).fsName.toLowerCase())
                {
                if (!app.notifiersEnabled) app.notifiersEnabled = true;
                return true;
                }
            }

        app.notifiers.add(event_name, File(script_name), event_class);
        app.notifiersEnabled = true;
        return true;
        }
    catch (e) { _alert(e); return false; }
    }

//////////////////////////////////////////////////////////////////////////
function disable_notifier(event_name, script_name, event_class)
    {
    try
        {
        var ret = false;

        for (var i = 0; i < app.notifiers.length; i++)
            {
            if (app.notifiers[i].event == event_name &&
                File(app.notifiers[i].eventFile).fsName.toLowerCase() == File(script_name).fsName.toLowerCase())
                {
                app.notifiers[i].remove();
                ret = true;
                }
            }

        if (!app.notifiers.length) app.notifiersEnabled = false;

        return ret;
        }
    catch (e) { _alert(e); return false; }
    }

//////////////////////////////////////////////////////////////////////////
function k2s(key)
    {
    try
        {
        var str = typeIDToStringID(key);
        var chr = typeIDToCharID(key);

        switch (chr)
            {
            case "Gd  ": str = "guide";  break;
            case "Grn ": str = "green";  break;
            case "Grns": str = "greens"; break;
            case "Pnt ": str = "point";  break;
            case "Rds ": str = "";       break;
            case "Intr": str = "";       break;
            }

        if (str) return "stringIDToTypeID(\"" + str + "\")";
        else if (chr) return "charIDToTypeID(\"" + chr + "\")";
        else return "Bug!";
        }
    catch (e) { throw(e); }
    }

////////////////////////////////////////////////////////////////////////////////////////////
function dat(s)
    {
    try
        {
        var ret = "";

        var len = s.length;

        if (len > max_data_len)
            {
            ret = "/* real data length = " + s.length + ", truncated to " + max_data_len + "*/ ";

            len = max_data_len;
            }

        ret += "String.fromCharCode(";

        for (var i = 0; i < len; i++)
            {
            var h = s.charCodeAt(i).toString(16).toUpperCase();
            if (h.length == 1) h = "0" + h;
            ret += "0x" + h;
            if (i != s.length-1) ret += ",";
            }

        ret += ")";

        return ret;
        }
    catch (e) { throw(e); }
    }

////////////////////////////////////////////////////////////////////////////////////////////
function src(s)
    {
    try
        {
        s = s.toSource()
        s = s.replace(/^\(new String\("/, "");
        s = s.replace(/"))$/, "");

        return s;
        }
    catch (e) { throw(e); }
    }

//////////////////////////////////////////////////////////////////////////
function parse_desc(desc)
    {
    try
        {
        var name = dsc_name + (dsc_numb?dsc_numb:"");

        var code = (dsc_numb?"":(tab + tab)) + "var " + name + " = new ActionDescriptor();";

        for (var i = 0; i < desc.count; i++)
            {
            var key  = desc.getKey(i);
            var type = desc.getType(key);

            var str = "// UNNKOWN TYPE!";

            var var_numb;

            switch (type)
                {
                case DescValueType.OBJECTTYPE:    ++dsc_numb; var_numb = dsc_numb; str = parse_desc(desc.getObjectValue(key)) + "\n" + tab + tab + name + ".putObject(" + k2s(key)    + ", " + k2s(desc.getObjectType(key)) + ", " + dsc_name + (var_numb?var_numb:"") + ");"; break;
                case DescValueType.LISTTYPE:      ++lst_numb; var_numb = lst_numb; str = parse_list(desc.getList(key))        + "\n" + tab + tab + name + ".putList("   + k2s(key)    + ", " + lst_name + (var_numb?var_numb:"") + ");"; break;
                case DescValueType.REFERENCETYPE: ++ref_numb; var_numb = ref_numb; str = parse_ref(desc.getReference(key))    + "\n" + tab + tab + name + ".putReference(" + k2s(key) + ", " + ref_name + (var_numb?var_numb:"") + ");"; break;

                case DescValueType.CLASSTYPE:        str = name + ".putClass(" + k2s(key) + ", " + k2s(desc.getClass(key))   + ");"; break;
                case DescValueType.RAWTYPE:          str = name + ".putData("  + k2s(key) + ", " + dat(desc.getData(key))    + ");"; break;;

                case DescValueType.BOOLEANTYPE:      str = name + ".putBoolean("      + k2s(key) + ", " + desc.getBoolean(key)      + ");"; break;
                case DescValueType.INTEGERTYPE:      str = name + ".putInteger("      + k2s(key) + ", " + desc.getInteger(key)      + ");"; break;
                case DescValueType.DOUBLETYPE:       str = name + ".putDouble("       + k2s(key) + ", " + desc.getDouble(key)       + ");"; break;
                case DescValueType.LARGEINTEGERTYPE: str = name + ".putLargeInteger(" + k2s(key) + ", " + desc.getLargeInteger(key) + ");"; break;

                case DescValueType.STRINGTYPE:       str = name + ".putString(" + k2s(key) +          ", \"" + src(desc.getString(key)) + "\");";  break;
                case DescValueType.ALIASTYPE:        str = name + ".putPath("   + k2s(key) + ", new File(\"" + desc.getPath(key)   + "\"));"; break;

                case DescValueType.UNITDOUBLE:       str = name + ".putUnitDouble(" + k2s(key) + ", " + k2s(desc.getUnitDoubleType(key))  + ", " + desc.getUnitDoubleValue(key)       + ");"; break;
                case DescValueType.ENUMERATEDTYPE:   str = name + ".putEnumerated(" + k2s(key) + ", " + k2s(desc.getEnumerationType(key)) + ", " + k2s(desc.getEnumerationValue(key)) + ");"; break;
                }

            code += "\n" + tab + tab + str;
            }

        return code;
        }
    catch (e) { _alert(e); throw(e); }
    }

//////////////////////////////////////////////////////////////////////////
function parse_list(list)
    {
    try
        {
        var name = lst_name + (lst_numb?lst_numb:"");
        var code = "var " + name + " = new ActionList();";

        for (var i = 0; i < list.count; i++)
            {
            var type = list.getType(i);

            var str = "// UNNKOWN TYPE!";

            var var_numb;

            switch (type)
                {
                case DescValueType.OBJECTTYPE:    ++dsc_numb; var_numb = dsc_numb; str = parse_desc(list.getObjectValue(i)) + "\n" + tab + tab + name + ".putObject("    + k2s(list.getObjectType(i)) + ", " + dsc_name + (var_numb?var_numb:"") + ");"; break;
                case DescValueType.LISTTYPE:      ++lst_numb; var_numb = lst_numb; str = parse_list(list.getList(i))        + "\n" + tab + tab + name + ".putList("      + lst_name + (var_numb?var_numb:"") + ");"; break;
                case DescValueType.REFERENCETYPE: ++ref_numb; var_numb = ref_numb; str = parse_ref(list.getReference(i))    + "\n" + tab + tab + name + ".putReference(" + ref_name + (var_numb?var_numb:"") + ");"; break;

                case DescValueType.CLASSTYPE:        str = name + ".putClass(" + k2s(list.getClass(i)) + ");"; break;
                case DescValueType.RAWTYPE:          str = name + ".putData("  + dat(desc.getData(i))  + ");"; break;;

                case DescValueType.BOOLEANTYPE:      str = name + ".putBoolean("      + list.getBoolean(i)      + ");"; break;
                case DescValueType.INTEGERTYPE:      str = name + ".putInteger("      + list.getInteger(i)      + ");"; break;
                case DescValueType.DOUBLETYPE:       str = name + ".putDouble("       + list.getDouble(i)       + ");"; break;
                case DescValueType.LARGEINTEGERTYPE: str = name + ".putLargeInteger(" + list.getLargeInteger(i) + ");"; break;

                case DescValueType.STRINGTYPE:       str = name + ".putString(" +          "\"" + src(list.getString(i)) + "\");";  break;
                case DescValueType.ALIASTYPE:        str = name + ".putPath("   + "new File(\"" + list.getPath(i)   + "\"));"; break;

                case DescValueType.UNITDOUBLE:       str = name + ".putUnitDouble(" + k2s(list.getUnitDoubleType(i))  + ", " + list.getUnitDoubleValue(i)       + ");"; break;
                case DescValueType.ENUMERATEDTYPE:   str = name + ".putEnumerated(" + k2s(list.getEnumerationType(i)) + ", " + k2s(list.getEnumerationValue(i)) + ");"; break;
                }

            code += "\n" + tab + tab + str;
            }

        return code;
        }
    catch (e) { _alert(e); throw(e); }
    }

////////////////////////////////////////////////////////////////////////////////////////////
function parse_ref(ref)
    {
    try
        {
        var name = ref_name + (ref_numb?ref_numb:"");
        var code = "var " + name + " = new ActionReference();";

        while (1)
            {
            var ok = true;

            try { var type = ref.getForm(); } catch (e) { ok = false; }
            if (!ok) break;

            var str = "// UNNKOWN TYPE!";

            switch (type)
                {
                case ReferenceFormType.ENUMERATED: str = name + ".putEnumerated(" + k2s(ref.getDesiredClass()) + ", " + k2s(ref.getEnumeratedType()) + ", " + k2s(ref.getEnumeratedValue()) + ");"; break;
                case ReferenceFormType.CLASSTYPE:  str = name + ".putClass("      + k2s(ref.getDesiredClass()) + ");"; break;
                case ReferenceFormType.IDENTIFIER: str = name + ".putIdentifier(" + k2s(ref.getDesiredClass()) + ", " + ref.getIdentifier() + ");"; break;
                case ReferenceFormType.INDEX:      str = name + ".putIndex("      + k2s(ref.getDesiredClass()) + ", " + ref.getIndex()      + ");"; break;
                case ReferenceFormType.OFFSET:     str = name + ".putOffset("     + k2s(ref.getDesiredClass()) + ", " + ref.getOffset()     + ");"; break;
                case ReferenceFormType.NAME:       str = name + ".putName("       + k2s(ref.getDesiredClass()) + ", \"" + src(ref.getName()) + "\");"; break;
                case ReferenceFormType.PROPERTY:   str = name + ".putProperty("   + k2s(ref.getDesiredClass()) + ", " + k2s(ref.getProperty())  + ");"; break;
                }

            code += "\n" + tab + tab + str;

            try { ref = ref.getContainer(); } catch (e) { ok = false; }
            if (!ok) break;
            }

        return code;
        }
    catch (e) { _alert(e); throw(e); }
    }
