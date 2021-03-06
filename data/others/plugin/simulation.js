function Sim(scen) {
	var state = {};
	var data = {};
	// initialize state
	this.init(scen);
}

// initialize state by scenario
Sim.prototype.init = function(scen) {
	if(scen == "coin") {
		this.initBinom();
	} else if (scen == "factory") {
		this.initNorm();
	} else {
		this.initExp();
	}
	console.log('*'+scen);
	return scen;
};

// randomize n-item order
Sim.prototype.randOrder = function(n) {
	// create n-item array
	var a = [];
	for (var i=0, l=n; i<n; i++){
  		a.push(i);
	}
	// shuffle array
	var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    this.state.order = a;
}

Sim.prototype.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};


Sim.prototype.randCorrect = function() {
	var l = this.state.choice.length;
	var r = [];
	for(var i=0; i < l; i++) {
		r.push(Number(i));
	}
	r = this.shuffle(r);
	var param_new = [];
	var answer_new = [];
	for(var i=0; i < l; i++) {
		param_new.push( this.state.param[ Number(r[i]) ] );
		answer_new.push( this.state.answer[ Number(r[i]) ] );
	}
	this.state.param = param_new;
	this.state.answer = answer_new;

        console.log("randcorrect: %o", this.state);
}

// initial settings for coin scenario
Sim.prototype.initBinom = function() {
	var precise = {
		"mean": 2,
		"sd": .05 // sd = 5ミリ
	};
	var sd_large = {
		"mean": 2,
		"sd": .1 // sd = 10ミリ
	};
//Please modify them above.	
//Please keep them below.	
	this.state = {
		"name": ["実験"],
		"title": ["イカサマ・コインを探せ！"],
		"titleimage": ["coin_title"],
		"bgimage": ["coin"],
		"image": ["coin_fore", "coin_back", "coin_half"],
		"place": ["帰り道"],
		"order": ["友達のコインはイカサマコイン？"],
		"question": ["友達のコインは次のA、B、Cのうち、どれ？"],
		"choice": ["表ばかり出る", "裏ばかり出る", "表裏半々出る"],
//Please keep them above.
//and please modify these parameter below.
		"param": [sd_large, precise, precise],
		"answer": [true, false, false],
		"experiment": [
			{
				"text": "各ラインから飴を100個ずつ取り出して、大きさ（直径）の分布をグラフにする",
				"args": {
					"n": 100,
					// "func": "hist"
				}
			},
			{
				"text": "各ラインから飴を1000個ずつ取り出して、大きさ（直径）の分布をグラフにする",
				"args": {
					"n": 1000,
					// "func": "hist"
				}
			}
		]
	};

	this.randCorrect();
	
};

// initial settings for factory scenario
Sim.prototype.initNorm = function() {
	var precise = {
		"mean": 2,
		"sd": .05 // sd = 5ミリ
	};
	var sd_large = {
		"mean": 2,
		"sd": .1 // sd = 10ミリ
	};
	this.state = {
		"name": ["調査"],
		"title": ["生産にバラツキのあるラインを発見せよ！"],
		"titleimage": ["candy"],
		"bgimage": ["factory"],
		"image": ["factory", "factory", "factory"],
		"place": ["菓子製造工場"],
		"order": ["問題のある製造ラインを探せ！"],
		"question": ["次のA、B、Cのうち、問題のある製造ラインはどれ？"],
		"choice": ["ラインA", "ラインB", "ラインC"],
		"param": [sd_large, precise, precise],
		"answer": [true, false, false],
		"experiment": [
			{
				"text": "各ラインから飴を100個ずつ取り出して、大きさ（直径）の分布をグラフにする",
				"args": {
					"n": 100,
					// "func": "hist"
				}
			},
			{
				"text": "各ラインから飴を1000個ずつ取り出して、大きさ（直径）の分布をグラフにする",
				"args": {
					"n": 1000,
					// "func": "hist"
				}
			}
		]
	};

	this.randCorrect();

};


// initial settings for store scenario
Sim.prototype.initExp = function() {
	var precise = {
		"theta": Number(1/60) // 待ち時間 1分
	};
	var sd_large = {
		"theta": Number(1/300) // 待ち時間 5分
	};

	this.state = {
		"name": ["調査"],
		"title": ["お客さんが待たなくてよいレジの個数って？"],
		"titleimage": ["register"],
		"image": ["store", "store", "store"],
		"bgimage": ["store"],
		"place": ["スーパーマーケット"],
		"order": ["待ち時間の長い店を当てろ！"],
		"question": ["次のA、B、Cのうち、レジに問題のある店舗はどれ？"],
		"choice": ["店舗A", "店舗B", "店舗C"],
		"param": [sd_large, precise, precise],
		"answer": [true, false, false],
		"experiment": [
			{
				"text": "各店舗の、10名のお客さんがレジに並んでから会計までにかかる時間（秒）の分布をグラフにする",
				"args": {
					"n": 10
				}
			},
			{
				"text": "各店舗の、100名のお客さんがレジに並んでから会計までにかかる時間（秒）の分布をグラフにする",
				"args": {
					"n": 100
				}
			},
			{
				"text": "各店舗の、1000名のお客さんがレジに並んでから会計までにかかる時間（秒）の分布をグラフにする",
				"args": {
					"n": 1000
				}
			},
		]
	};

	this.randCorrect();

};

Sim.prototype.makeRandomNum = function(min, max) {
  return Math.random() * (max - min) + min;
}

Sim.prototype.runNorm = function(item) {
	var util = new Util();

	var l = this.state.param.length;
	for(var i=0; i<l; i++) {
		var args = {
			"main": this.state.choice[i],
			"xlab": "大きさ（直径）",
			"ylab": "個数"
		};

		Object.assign(args, item);
		Object.assign(args, this.state.param[i]);
		util.addCustRun("sampling_normal_hist_v1", args, "");
		//
		var size = {
	      "width": 300,
	      "height": 300
	    };	

//	    util.generateImage($,".acdn-content","平均の棒グラフ.png", size, function() {
    	
    	//added by ryo
	    util.generateImage($,".content-"+i+":eq(-1)","平均の棒グラフ.png", size, function() {
			console.log('image generated.');
    	}, function(){
	    	console.log('generating image failed.');
    	});	
	}
}

Sim.prototype.runBinom = function() {

};

Sim.prototype.runExp = function(item) {
	var util = new Util();

	var l = this.state.param.length;
	for(var i=0; i<l; i++) {
		var args = {
			"main": this.state.choice[i],
			"xlab": "待ち時間（秒）",
			"ylab": "人数"
		};

		Object.assign(args, item);
		Object.assign(args, this.state.param[i]);

		util.addCustRun("sampling_exp_hist_v1", args, "");
		//
		var size = {
	      "width": 300,
	      "height": 300
	    };	
    	
    	//added by ryo
	    util.generateImage($,".content-"+i+":eq(-1)","平均の棒グラフ.png", size, function() {
			console.log('image generated.');
    	}, function(){
	    	console.log('generating image failed.');
    	});	
	}
};

