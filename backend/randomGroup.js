const locations = [
	{
		"abbr": "AL",
		"name": "Alabama",
		"capital": "Montgomery",
		"lat": "32.361538",
		"long": "-86.279118"
	},
	{
		"abbr": "AK",
		"name": "Alaska",
		"capital": "Juneau",
		"lat": "58.301935",
		"long": "-134.419740"
	},
	{
		"abbr": "AZ",
		"name": "Arizona",
		"capital": "Phoenix",
		"lat": "33.448457",
		"long": "-112.073844"
	},
	{
		"abbr": "AR",
		"name": "Arkansas",
		"capital": "Little Rock",
		"lat": "34.736009",
		"long": "-92.331122"
	},
	{
		"abbr": "CA",
		"name": "California",
		"capital": "Sacramento",
		"lat": "38.555605",
		"long": "-121.468926"
	},
	{
		"abbr": "CO",
		"name": "Colorado",
		"capital": "Denver",
		"lat": "39.7391667",
		"long": "-104.984167"
	},
	{
		"abbr": "CT",
		"name": "Connecticut",
		"capital": "Hartford",
		"lat": "41.767",
		"long": "-72.677"
	},
	{
		"abbr": "DE",
		"name": "Delaware",
		"capital": "Dover",
		"lat": "39.161921",
		"long": "-75.526755"
	},
	{
		"abbr": "FL",
		"name": "Florida",
		"capital": "Tallahassee",
		"lat": "30.4518",
		"long": "-84.27277"
	},
	{
		"abbr": "GA",
		"name": "Georgia",
		"capital": "Atlanta",
		"lat": "33.76",
		"long": "-84.39"
	},
	{
		"abbr": "HI",
		"name": "Hawaii",
		"capital": "Honolulu",
		"lat": "21.30895",
		"long": "-157.826182"
	},
	{
		"abbr": "ID",
		"name": "Idaho",
		"capital": "Boise",
		"lat": "43.613739",
		"long": "-116.237651"
	},
	{
		"abbr": "IL",
		"name": "Illinois",
		"capital": "Springfield",
		"lat": "39.783250",
		"long": "-89.650373"
	},
	{
		"abbr": "IN",
		"name": "Indiana",
		"capital": "Indianapolis",
		"lat": "39.790942",
		"long": "-86.147685"
	},
	{
		"abbr": "IA",
		"name": "Iowa",
		"capital": "Des Moines",
		"lat": "41.590939",
		"long": "-93.620866"
	},
	{
		"abbr": "KS",
		"name": "Kansas",
		"capital": "Topeka",
		"lat": "39.04",
		"long": "-95.69"
	},
	{
		"abbr": "KY",
		"name": "Kentucky",
		"capital": "Frankfort",
		"lat": "38.197274",
		"long": "-84.86311"
	},
	{
		"abbr": "LA",
		"name": "Louisiana",
		"capital": "Baton Rouge",
		"lat": "30.45809",
		"long": "-91.140229"
	},
	{
		"abbr": "ME",
		"name": "Maine",
		"capital": "Augusta",
		"lat": "44.323535",
		"long": "-69.765261"
	},
	{
		"abbr": "MD",
		"name": "Maryland",
		"capital": "Annapolis",
		"lat": "38.972945",
		"long": "-76.501157"
	},
	{
		"abbr": "MA",
		"name": "Massachusetts",
		"capital": "Boston",
		"lat": "42.2352",
		"long": "-71.0275"
	},
	{
		"abbr": "MI",
		"name": "Michigan",
		"capital": "Lansing",
		"lat": "42.7335",
		"long": "-84.5467"
	},
	{
		"abbr": "MN",
		"name": "Minnesota",
		"capital": "Saint Paul",
		"lat": "44.95",
		"long": "-93.094"
	},
	{
		"abbr": "MS",
		"name": "Mississippi",
		"capital": "Jackson",
		"lat": "32.320",
		"long": "-90.207"
	},
	{
		"abbr": "MO",
		"name": "Missouri",
		"capital": "Jefferson City",
		"lat": "38.572954",
		"long": "-92.189283"
	},
	{
		"abbr": "MT",
		"name": "Montana",
		"capital": "Helana",
		"lat": "46.595805",
		"long": "-112.027031"
	},
	{
		"abbr": "NE",
		"name": "Nebraska",
		"capital": "Lincoln",
		"lat": "40.809868",
		"long": "-96.675345"
	},
	{
		"abbr": "NV",
		"name": "Nevada",
		"capital": "Carson City",
		"lat": "39.160949",
		"long": "-119.753877"
	},
	{
		"abbr": "NH",
		"name": "New Hampshire",
		"capital": "Concord",
		"lat": "43.220093",
		"long": "-71.549127"
	},
	{
		"abbr": "NJ",
		"name": "New Jersey",
		"capital": "Trenton",
		"lat": "40.221741",
		"long": "-74.756138"
	},
	{
		"abbr": "NM",
		"name": "New Mexico",
		"capital": "Santa Fe",
		"lat": "35.667231",
		"long": "-105.964575"
	},
	{
		"abbr": "NY",
		"name": "New York",
		"capital": "Albany",
		"lat": "42.659829",
		"long": "-73.781339"
	},
	{
		"abbr": "NC",
		"name": "North Carolina",
		"capital": "Raleigh",
		"lat": "35.771",
		"long": "-78.638"
	},
	{
		"abbr": "ND",
		"name": "North Dakota",
		"capital": "Bismarck",
		"lat": "48.813343",
		"long": "-100.779004"
	},
	{
		"abbr": "OH",
		"name": "Ohio",
		"capital": "Columbus",
		"lat": "39.962245",
		"long": "-83.000647"
	},
	{
		"abbr": "OK",
		"name": "Oklahoma",
		"capital": "Oklahoma City",
		"lat": "35.482309",
		"long": "-97.534994"
	},
	{
		"abbr": "OR",
		"name": "Oregon",
		"capital": "Salem",
		"lat": "44.931109",
		"long": "-123.029159"
	},
	{
		"abbr": "PA",
		"name": "Pennsylvania",
		"capital": "Harrisburg",
		"lat": "40.269789",
		"long": "-76.875613"
	},
	{
		"abbr": "RI",
		"name": "Rhode Island",
		"capital": "Providence",
		"lat": "41.82355",
		"long": "-71.422132"
	},
	{
		"abbr": "SC",
		"name": "South Carolina",
		"capital": "Columbia",
		"lat": "34.000",
		"long": "-81.035"
	},
	{
		"abbr": "SD",
		"name": "South Dakota",
		"capital": "Pierre",
		"lat": "44.367966",
		"long": "-100.336378"
	},
	{
		"abbr": "TN",
		"name": "Tennessee",
		"capital": "Nashville",
		"lat": "36.165",
		"long": "-86.784"
	},
	{
		"abbr": "TX",
		"name": "Texas",
		"capital": "Austin",
		"lat": "30.266667",
		"long": "-97.75"
	},
	{
		"abbr": "UT",
		"name": "Utah",
		"capital": "Salt Lake City",
		"lat": "40.7547",
		"long": "-111.892622"
	},
	{
		"abbr": "VT",
		"name": "Vermont",
		"capital": "Montpelier",
		"lat": "44.26639",
		"long": "-72.57194"
	},
	{
		"abbr": "VA",
		"name": "Virginia",
		"capital": "Richmond",
		"lat": "37.54",
		"long": "-77.46"
	},
	{
		"abbr": "WA",
		"name": "Washington",
		"capital": "Olympia",
		"lat": "47.042418",
		"long": "-122.893077"
	},
	{
		"abbr": "WV",
		"name": "West Virginia",
		"capital": "Charleston",
		"lat": "38.349497",
		"long": "-81.633294"
	},
	{
		"abbr": "WI",
		"name": "Wisconsin",
		"capital": "Madison",
		"lat": "43.074722",
		"long": "-89.384444"
	},
	{
		"abbr": "WY",
		"name": "Wyoming",
		"capital": "Cheyenne",
		"lat": "41.145548",
		"long": "-104.802042"
	}
];

const streetEnds = ['AVE', 'BLVD', 'ST', 'PKWY', 'PLZ', 'DR', 'CT', 'RD', 'LN'];

const types = ['Arts', 'Business', 'Games', 'Sports', 'Fitness', 'Outdoors', 'Social', 'Music', 'Religion', 'Technology'];

const groupNames = ['Tipsy Painters', 'Pursuit of HAPPYness', 'Masterminds', `Dodge the Ball`, 'No PAIN No GAIN', 'Hike and Chat', 'Coffee and Conversation', "F.O.A.M.", 'One Love', 'Tech Overflow'];

const abouts = [
`Tipsy Painters is a traveling painting party that is hosted out-of-doors and indoors at various venue locations. Our indoor venues include bars, lounges, casual restaurants as well as private homes and corporate offices. Our outdoor painting takes place in parks during the spring, summer and fall.

Our class is wonderful for all ages and all levels- beginners through advanced! Attendees learn the basics of painting ~ mixing, shading and blending all the while enjoying a social experience. As they work, our students can enjoy a beverage and some snacks.`,

`MEET AND GROW RICH! This is also a club where we meet to talk about money making opportunities, to share GENUINE opportunities and to help out each other's businesses!
Inclusivity and mutual support is what this is all about! Whether you are a veteran business builder or someone just starting out and exploring options or simply wanting to meet and have a drink from time to time, WELCOME!`,

`Want to discover a new hobby meetup? Here comes this new weekly board gaming event that you can join! We would like to form a group of board game enthusiasts who love playing games. We decided to meet every week to kill some time or to just RELAX!! Whether you're new to board gaming or you are a proficient gamer, all are welcome to join :)`,

`Welcome to The Dodge the Ball Group! Our goal is to provide a platform to meet, be social, and play dodgeball! There are free pick up events as well as full season dodgeball leagues. After dodgeball we'll go to a local bar for further socialize/drinking games. So if you're looking to be social, be active, and meet new people, this is the place for you!`,

`Calling all ladies and gentlemen who are looking to develop more strength, agility and endurance.
Join us for outdoor classes where you will dare
your mind and body to diverse fitness challenges.`,

`Hike and Chat is a friendly community of enthusiasts who enjoy outdoor activities, appreciate nature, and have fun together. The goal is to be active, fit, and maintain a healthy lifestyle. Activities include hiking, biking, camping, kayaking, golfing, etc.`,

`I thought meeting over coffee / tea would be a simple way to make new friends. Each month, we'll host an event at a coffee shop in the city and have a conversation over an interesting topic. Everyone will have an opportunity to share their thoughts and contribute to the discussion. Occasionally there will be other types of events - brunches, walks and museums posted too.`,

`This is Friends Of All Music (F.O.A.M.)

The goal of F.O.A.M. is to bring music lovers together so that we can spend time with like-minded people and create lasting friendships in the process.`,

`Religion. What else can we say about it? Let's get together and chat about it.`,

`We are a community of developers prepping for coding interviews, participating in hackathons, building portfolio projects, and attending software engineering panels TOGETHER. No coder is an island, and you don't have to be one either.

In the past we've had App Academy, Codesmith, Fullstack Academy, Grace Hopper, Flatiron, New York Code + Design, General Assembly++ grads sit alongside our self-taught programmers and computer science majors to hack at projects, crack algos, and speak to software engineers from companies like Coinbase and Bloomberg.`
];

const nuts = ['WALNUT', 'PEANUT', 'CASHEW', 'PISTACHIO', 'PECAN', 'ALMOND', 'MACADAMIA', 'HAZELNUT', 'CHESTNUT'];

const privacy = [true, false];

// let groups = [];

// for (let i = 0; i < 25; i++) {
//     const randID = Math.floor(Math.random() * 25);
//     const randG = Math.floor(Math.random() * 10);
//     const randLoc = Math.floor(Math.random() * 50);
//     const randLogic = Math.floor(Math.random() * 2);

//     groups.push({
//         organizerId: randID,
//         name: groupNames[randG],
//         about: abouts[randG],
//         type: types[randG],
//         private: privacy[randLogic],
//         city: locations[randLoc].capital,
//         state: locations[randLoc].abbr
//     })
// }
// console.log(groups);

let venues = [];
for (let i = 0; i < 25; i++) {
    const randID = Math.floor(Math.random() * 25);
    const randLoc = Math.floor(Math.random() * 50);
    const randNut = Math.floor(Math.random() * 9);
    const randAdd = Math.floor(Math.random() * 10000);

    venues.push({
        groupId: randID,
        address: `${randAdd} ${nuts[randNut]} ${streetEnds[randNut]}`,
        city: locations[randLoc].capital,
        state: locations[randLoc].abbr,
        lat: locations[randLoc].lat,
        lng: locations[randLoc].long
    })
}
console.log(venues);
