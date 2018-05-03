




function run ( states , starts,ends ) {
	var g = new dagreD3.graphlib.Graph().setGraph({});
	 

	// Automatically label each of the nodes
	states.forEach(function(state) {
		g.setNode(state, {
			label : state
		});
	});

	for(var i =0 ; i<starts.length ; i++){
		
		g.setEdge(starts[i], ends[i], {
			label : "do"
		});
		
	}
	
	 
	
	

	// Set some general styles
	g.nodes().forEach(function(v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});

	// Add some custom colors based on state
	// g.node('NODE3').style = "fill: #f77";
	// g.node('NODE2').style = "fill: #347";

	var svg = d3.select("svg"), inner = svg.select("g");

	// Set up zoom support
	var zoom = d3.behavior.zoom().on(
			"zoom",
			function() {
				inner.attr("transform", "translate(" + d3.event.translate + ")"
						+ "scale(" + d3.event.scale + ")");
			});
	svg.call(zoom);

	// Create the renderer
	var render = new dagreD3.render();

	// Run the renderer. This is what draws the final graph.
	render(inner, g);

	// Center the graph
	var initialScale = 0.75;
	zoom
			.translate(
					[ (svg.attr("width") - g.graph().width * initialScale) / 2, 20 ])
			.scale(initialScale).event(svg);
	svg.attr('height', g.graph().height * initialScale + 40);
}

 
