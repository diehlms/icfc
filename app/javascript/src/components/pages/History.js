import React from 'react'
import Title from "../../shared/Title"
import HorizontalLine from '../../shared/HorizontalLine'
import { HashLink as Link } from 'react-router-hash-link';
import SubTitle from '../../shared/SubTitle'
import BodyText from '../../shared/BodyText'
import SmallText from '../../shared/SmallText'
import HashLink from '../../shared/HashLink'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    root: {
        borderRadius: 0,
        margin: '5px'
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: 0,
      width: '30%'
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },

    },
}))(TableRow);

const campRows = [
    createData(1882, 'Monahan’s Point, Lake Sparrow'),
    createData(1883, 'Monahan’s Point, Lake Sparrow'),
    createData(1884, 'Long Lake, near Alpena, Michigan'),
    createData(1885, 'Long Lake, near Alpena, Michigan'),
    createData(1886, 'Monahan’s Point, Lake Sparrow'),
    createData(1887, 'Les Cheneaux Islands, near Mackinac Island, Michigan'),
    createData(1888, 'Trout Lake, near North Bay'),
    createData(1889, 'Monahan’s Point, Lake Sparrow'),
    createData(1890, 'Monahan’s Point, Lake Sparrow'),
    createData(1891, 'Monahan’s Point, Lake Sparrow'),
    createData(1892, 'Lake Talon, below Trout Lake'),
    createData(1893, 'Deep Bay, Lake Sparrow'),
    createData(1894, 'Deep Bay, Lake Sparrow'),
    createData(1895, 'Deep Bay, Lake Sparrow'),
    createData(1896, 'Maple Lake, near Parry Sound'),
    createData(1897, 'Go Home Bay, Georgian Bay'),
    createData(1898, 'Go Home Bay, Georgian Bay'),
    createData(1899, 'Go Home Bay, Georgian Bay'),
    createData(1900, 'Moon River, Georgian Bay'),
];

const presidentRows = [
    createData(2018, 'Richard W. Reed, Jr.'),
    createData('2015-2018', 'Samuel M. Sipe, Jr.'),
    createData('2013-2015', 'Bruce G. Lawson'),
    createData('2010-2013', 'Carolyn Bennett Reed'),
    createData('2007-2010', 'Nick Steffey'),
    createData('1997-1999', 'Walter R. Sloan'),
    createData('2001-2004', 'Frederik O. Crawford'),
    createData('1999-2001', 'William W. Crawford, Jr.'),
    createData('1997-1999', 'Gary C. Johnson'),
    createData('1995-1997', 'Walter A. Scott, III'),
    createData('1994-1995', 'John L. Huber'),
    createData('1991-1993', 'L. Stanton Williams'),
    createData('1989-1991', 'Jacob B. Brown, Jr.'),
    createData('1986-1989', 'John S. Crawford, II'),
    createData('1984-1986', 'Dr. George J. Wright. Jr.'),
    createData('1982-1984', 'Lavinia C. Yount'),
    createData('1981-1982', 'Derek Martin'),
    createData('1980-1981', 'William W. Crawford'),
    createData('1978-1980', 'David Bennett'),
    createData('1976-1978', 'A. Lowrie Applegate'),
    createData('1974-1976', 'Stewart H. Steffey'),
    createData('1970-1973', 'Randle Bereton'),
    createData('1966-1969', 'James W. Kinnear, Jr.'),
    createData('1964-1965', 'John A Succop'),
    createData('1962-1963', 'Malcolmn W. Reed'),
    createData('1960-1961', 'Ernest N. Calhoun'),
    createData(1959, 'Bennett S. Chapple, Jr.'),
    createData('1957-1958', 'Tom Oliver Morgan'),
    createData('1951-1956', 'Clarence B. Steffey'),
    createData('1949-1950', 'Bennett S. Chapple, Jr.'),
    createData('1946-1948', 'Bennett S. Chapple'),
    createData(1945, 'Dr. A.E. Dietrich'),
    createData('1915-1944', 'W.S. Horner'),
    createData('1882-1915', 'Bishop Charles W. Smith')
];

const paddleRows = [
    createData(2018, 'Bridget McCarthy'),
    createData(2017, 'Elsa Jenkins.'),
    createData(2016, 'Eleanor Burcham'),
    createData(2015, 'Lucy Bogar'),
    createData(2014, 'Harper Bennett'),
    createData(2013, 'Nyssa McCarthy & Sam Burke'),
    createData(2012, 'Dusty Martin'),
    createData(2011, 'Josh Martin'),
    createData(2010, 'Mei Raley'),
    createData(2009, 'Courtney Anderson'),
    createData(2008, 'Annie Lawson'),
    createData(2007, 'Robert Morrow'),
    createData(2006, 'Alexis Rodefer'),
    createData(2005, 'Alex Johnson'),
    createData(2004, 'Eleanor Bergland, Caitlin Chapple, David Scott'),
    createData(2003, 'Rory Kinnear'),
    createData(2002, 'Ben Johnson'),
    createData(2001, 'Jason Emond'),
    createData(2000, 'Carly Reed'),
    createData(1999, 'Andrew Heath'),
    createData(1998, 'Bruce Anderson & Meg Schade'),
    createData(1997, 'Anne Beatty & Bennett Reed'),
    createData(1996, 'Eddie Watters'),
    createData(1995, 'Jake Coyle'),
    createData(1994, 'Raleigh Harwell'),
    createData(1993, 'Eric Bell'),
    createData(1992, 'Justin Crawford'),
    createData(1991, 'David Wrightd'),
    createData(1990, 'Austin Applegate'),
    createData(1989, 'Laura Schurer & Justin Harrison'),
    createData(1988, 'Kristan Garvey'),
    createData(1987, 'Sam Allison & Paul Fritz'),
    createData(1986, 'Hamilton Ray'),
    createData(1985, 'Morgan Scott'),
    createData(1984, 'David Fritz'),
    createData(1983, 'George-Ann Greth'),
    createData(1982, 'Marten Jenkins, Jr.'),
    createData(1981, 'The staff gave it back to camp'),
    createData(1980, 'Gordon Fisher'),
    createData(1979, 'Ted Jenkins'),
    createData(1978, 'Liz Mitinger'),
    createData(1977, 'Gordon Fisher'),
    createData(1976, 'Davis Jenkins'),
    createData(1975, 'Steve Jenks'),
    createData(1974, 'Steve Campanella'),
    createData(1972, 'Jim Johnson'), 
    createData(1971, 'Paul Pilgrim'),
    createData(1969, 'Carl Williams'),
    createData(1965, 'John (Jay) A. Crawford'),
    createData(1964, 'George Wright III'),
    createData(1963, 'Lowrie Applegate, Jr.'),
    createData(1962, 'George Wright III'),
    createData(1961, 'Bob Reigeluth, Jr.'),
    createData(1960, 'Bill Tranter'),
    createData(1959, 'Joe Browne (started to go to staff)'),
    createData(1958, 'Ellen Morgan'),
    createData(1957, 'Drew Peacock'),
    createData(1955, 'arry (Tad) Crawford III'),
    createData(1946, 'Vinnie Yount'),
    createData(1942, 'Shortage of paddles, no individual winner'),
    createData(1938, 'Porter H. Scott'),
    createData(1936, 'Mary Applegate')
];

const tables = [
    { 
        data: campRows,
        title: "Camp"
    }, {
        data: presidentRows, 
        title: "Presidents"
    }, {
        data: paddleRows,
        title: "Paddle Winners"
    }
];

const pageSections = [
    { pageSection: "/history#OurHistoricalSetting", pageName: "Our Historical Setting"},
    { pageSection: "/history#HowItAllCameAbout", pageName: "How It All Came"},
    { pageSection: "/history#TheFirstEncampment", pageName: "The First Encampment"},
    { pageSection: "/history#EarlyEncampments", pageName: "Early Encampments"},
    { pageSection: "/history#ThePioneedBuilders", pageName: "The Pioneer Builders"},
    { pageSection: "/history#Contrasts", pageName: "Contrasts"},
    { pageSection: "/history#SocialLife", pageName: "Social Life"},
    { pageSection: "/history#SandyBeach", pageName: "Sandy Beach"},
    { pageSection: "/history#Fires", pageName: "Fires"},
    { pageSection: "/history#Financing", pageName: "Financing"},
    { pageSection: "/history#WaterTransportation", pageName: "Water Transportation"},
    { pageSection: "/history#Fishing", pageName: "Fishing"},
    { pageSection: "/history#Athletics", pageName: "Athletics"},
    { pageSection: "/history#SanitationHealth", pageName: "Sanitation & Health"},
    { pageSection: "/history#Maps", pageName: "Maps"},
    { pageSection: "/history#Membership", pageName: "Membership"},
    { pageSection: "/history#MasonicVisitation", pageName: "Masonic Visitation"},
    { pageSection: "/history#LiteraryGenius", pageName: "Literary Genius"},
    { pageSection: "/history#Sabbath", pageName: "Sabbath"},
    { pageSection: "/history#Officers", pageName: "Officers"},
    { pageSection: "/history#AirAge", pageName: "The Air Age"},
    { pageSection: "/history#IronCityOfToday", pageName: "Iron City of Today"}
]

function createData(year, text) {
    return { year, text };
}

const useStyles = makeStyles({
    table: {
        minWidth: 80
    },
    tableContainer: {
        margin: 12
    }
});

export default function History() {
    const classes = useStyles();
    
    return (
        <div className="containerMain">
            <Title text="History" />
            <SmallText text="The Story of the Club, from the Golden Jubilee Handbook (1931)" />
            <SmallText text="(The historical sketches following have been prepared with the assistance and collaboration of Rev. Dr. Charles L. Smith and Rev. Dr. Joseph W. Miles, the story of the Club prior to 1900 being contributed by Dr. Smith)" />
            <SmallText text="This is the story of the events of fifty years ago, concerning which there are so very few now living who can say with this writer: “Of them I was a part.”" />
            <HorizontalLine />
            <div style={{
                display: "grid",
                gridTemplateColumns: "60% 30%"
            }}>
                <div>
                    <SubTitle id="OurHistoricalSetting" text="Our Historical Setting" />
                    <BodyText text="Tradition informs us that two great Indian nations known as the Mengwe and the Lenni-Lenape came from the north and west of the Mississippi River where they met the Alligewi who were on the east side of the river. A great conflict resulted and the Alligewi were defeated, the victors dividing the territory.  The Mengwe took the territory about the Great Lakes and the Lenni-Lenape the territory south of the lakes. The two great descendants of these traditional Indians are known to us as the Iroquois and the Algonquins, and we are all familiar with the wonderful self-government of the Iroquois from whom many suggestions came in the development of our free American government." />
                    <BodyText text="The most important contact with the North American aborigines in the Georgian Bay territory was in 1615 when Samuel de Champlain, the great explorer, ascended the St. Lawrence River to the Ottawa River, up thence to the country of the Algonquins on Lake Nipissing.  After remaining here two days he entered the French River to Lake Attigoutan (Georgian Bay).  There he found Indian corn and squashes, blue berries and raspberries.  He met a tribe of 300 men who painted their faces and carried only bows and arrows as arms.  Their nostrils were pierced and their ears adorned with beads.  The chief told him they came here to camp and dried blueberries for their wonder food.  The next day Champlain followed the shore of the Georgian Bay which he said contained many islands and which he named the “Fresh Sea”.  He saw fish 4½ feet long.  The country bordering this sea was inhabited by savages.  Later he crossed a bay—Matchedash, and crossed the country between Georgian Bay and Lake Simcoe.  He described this as being very pleasant and the Indian corn was far advanced.  This was the latter part of July.  He arrived at Cahiague (near Orillia) on August 17 where he was “received with great delight” by the savages.  These were at war with the Iroquois and they reported another nation some distance away also a war that could supply 500 good men if Champlain would assist them in an expedition against the Iroquois." />
                    <BodyText text="When the men were all assembled Champlain began his march on September 1st.  They crossed Lake Ontario in a southerly direction and landed at a point west of Hungry Bay or possibly in Henderson Bay." />
                    <BodyText text="After several days’ journey they came to the enemy’s stronghold, the site of which is supposed to have been at the town of Fenner, Madison County, New York." />
                    <BodyText text="Champlain’s account of their attack on this fort is most interesting.  Suffice it to say Champlain found his warriors preferred to fight in their own way and the enemy being well fortified did not suffer much from the attack." />
                    <BodyText text="Probably the most important contact was the efforts made at evangelization of the Indians.  About the same time the Champlain was making his explorations up the Ottawa, the Recollet friars erected a mission at Huronia for the Huron Indians south of Georgian Bay.  This passed to the Jesuits in 1626." />
                    <BodyText text="However not much progress was made until the year 1634 when Brebeuf, Daniel and Lalement inaugurated a mission among the Hurons.  Christian villages were established along the lakes, bays and rivers between the Georgian Bay to Lake Simcoe." />
                    <BodyText text="In 1640 Brebeuf built on the River Wye a fortified stone house which was christened “St. Marie”.  This was the central residence for the Jesuit missionaries working among the Huron in that vicinity.  Some years later the Iroquois closed the water communication to Quebec and 1648 ended the Huron expeditions.  In this year Cardinal Richelieu, Prime Minister of France, sent aid to missionaries and a fortification was built surrounding St. Marie." />
                    <BodyText text="A cannon sent from Quebec in this year to strengthen the fortification is said to be preserved in the Library at Penetanguishene.  The following year St. Ignac and St. Louis were destroyed and the Fathers Brebeuf and Lalement were cruelly slain by the Iroquois.  The greater part of the Huron nation was destroyed in the remainder took refuge on Christian Island.  Ft. St. Marie was destroyed by the Jesuits rather than have it fall into the hands of the Iroquois.  They then retired to Christian Island where the second Ft. St. Marie was built." />
                    <BodyText text="The beautiful shrine about a mile from Midland, in which we pass on our trip to camp, was built by the Jesuits as a memorial church to the Canadian martyrs on the site of all St. Marie." />
                    <BodyText text="After the annihilation of the Hurons by the Iroquois, the Algonquins, or as we know them, the Chippewa or Ojibway Indians, began to settle on the lands formerly occupied by the Hurons.  For almost a century they were unmolested, the chiefs dividing hunting and fishing territory, each having a river and its tributaries, the rights on which were respected by the other chiefs." />
                    <BodyText text="They lived in wigwams made of three poles about 15 ft. long with crotches at the bottom so that they would be held firmly in the ground.  The upper ends were fastened with strips of bark.  Over the outside were plaited mats of grass or birch bark.  An opening at the top was left for the exit of smoke.  Skins of animals formed the door.  The family sat on mats on the floor much the same as the early Japanese." />
                    <BodyText text="In 1828, General Darling reported that the Chippewas who formerly occupied the lands about Lake Simcoe, Holland River and the unsettled country expressed their desire to become Christians and adopt the habits of civilized life, so in 1830 Lieutenant-Governor Sir J. Colborne, assigned them attract of 9800 acres of land on the northwest shore of Lake Simcoe.  There were three tribes of Chippewas under Chiefs Yellow Head, Aisance and Snake, also some Pottawatamies from Drummond Island.  A descendant of Chief Aisance, bearing the same name, is among our Indians." />
                    <BodyText text="This brings us to the period when the ancestors of our present Indian guides fished and hunted about our camp and of which we have heard interesting stories.  The historical setting of our camp site is seen to extend into the last 300 years and who can say that Champlain did not visit our beautiful sand beach or ascend the Moon River to the falls while on his journey down to Matchedash Bay amid magnificent scenery." />
                    <SubTitle id="HowItAllCameAbout" text="How it All Came About" />
                    <BodyText text="An article which appeared in the Pittsburgh Christian Advocate on September 15, 1881, was the seed from which in half a century has come the present ample growth of the Iron City Fishing Club.  This article, entitled “A Canadian Fishing Excursion”, was written by the Rev. Dr. W.F. Day, then pastor of the Methodist Episcopal Church in Titusville, Pennsylvania.  Dr. Day told a brief and graphic story of a camping trip taken in August, 1881, by a party of Titusville men, of whom he was one, to Lake Sparrow and the lower Severn River. His story was read by the Rev. Dr. Charles W. Smith, then Presiding Elder of the Pittsburgh District of the Methodist Episcopal Church, and it suggested to him the organization of a party to camp on Lake Sparrow the following summer.  As a result of his efforts the interest of a number of friends was enlisted. " />
                    <BodyText text="At the same time the same article attracted the attention of Rev. Dr. Joseph W. Miles, then pastor of the Methodist Episcopal Church in the West End, Pittsburgh, who discussed it with several of his friends, among them Samuel L. Wood, J.O. Wood, B.D. Wood, Alex. McDavid and T.P. Hershberger, and they decided to join Dr. Day’s party.  Shortly before the party was to leave, illness in Dr. Day’s family prevented his going, and the result was that the two groups got together and organized the Iron City Fishing Club. " />
                    <BodyText text="Several meetings were held in office of Lee S. Smith, 52 Sixth Street, Pittsburgh, and a tentative organization was formed with Charles W. Smith as President, Lee S. Smith, Secretary and Samuel L. Wood, Treasurer.  To look after the Commissary purchases Wenman A. Lewis was appointed, and with the assistance of William H. Slack as Commissary this important matter was in due time attended to in plain but substantial fashion." />
                    <SubTitle id="TheFirstEncampment" text="The First Encampment" />
                    <BodyText text="Plans were made to go to Lake Sparrow on August 7, 1882, by way of the Pittsburgh & Lake Erie Railroad.  The financial arrangements for this first trip of the Club were much more modest than those of the Fiftieth.  Before the date of starting each member paid to the Treasurer $11.00 for railroad fare and $9.00 to cover cost of provisions, table and kitchen outfit, wages of the cook, and hire of five skiffs." />
                    <BodyText text="A uniform camp dress was informally adopted, prominent in which were a heavy blue flannel shirt and folding tan linen Lone Fisherman hat at that time so popular for outing wear.  In addition to these purchased items, the uniform was completed from home wardrobes with a most astonishing assortment of old trousers.  These well served the purpose, but the less written of them here the better.  Let them be remembered tenderly for their service, not their beauty." />
                    <BodyText text="The party as finally listed for the trip was as follows: C.W. Smith, Lee S. Smith, S.L. Wood, H.J. Smith, J.W. Miles, G.T. Reynolds, C. L. Smith, C.C. Scaife, W.L. Smith, W.H. Slack, J.O. Wood, B.D. Wood, S.A. Shepard, Reed Slack, W.W. Ramsey, N.S. Williams, Walter Williams, J.V. Brobst, J.H. Pollitt, W.A. Lewis, G.L. Lewis, H.D. Stewart, Alexander McDavid and T.P. Hershberger." />
                    <BodyText text="The Club left old Lake Erie station at 10:40 o’clock on the morning of Monday, August 7, 1882.  The trip was made in a combination car, the Club members occupying the passenger section and their baggage filling the other.  The journey was marked by a lengthening series of bumpy transfers of the special car from one train to another, these being made at Youngstown, Ashtabula, Buffalo, Suspension Bridge and Hamilton." />
                    <BodyText text="At Youngstown a telegram was sent to Toronto asking the Northern and Northwestern Railway Company to charter to the Club a special engine to haul the car at night without loss of time from Hamilton to Severn Bridge.  The engine was ready at Hamilton and the special night trip was begun.  In the morning as they neared their destination, the awaking members of the party discovered that the railroad company, in a fit of great generosity, had thrown in with the engine a long freight train for good measure, and were hauling it with the Club’s chartered engine, with the Club car rattling along jauntily at the tail end.  The Club members were deeply impressed by this gracious act." />
                    <BodyText text="Arriving at Severn Bridge at 8 o’clock on the morning of August 8, some of the party took the tents in the skiffs which were waiting and rowed four miles down the lovely Severn River to Monahan’s Point, where the Severn River widens into Lake Sparrow, and began to set up the camp.  Later in the day the rest of the party with the baggage were towed down the River on a scow by a small tug at a speed not much faster than the flow of the current." />
                    <BodyText text="In the camp there were five sleeping tents and one commissary tent.  The cook slept among the provisions -- very much so, indeed.  There was no cookhouse, all preparation of meals being done in the open, along the river bank, with the aid of two sets of four-legged grate bars and a dutch oven.  There was no dining tent.  Rough board tables, with equally rough board seats, were built between some clumps of trees close by the river.  If it rained while the meals were being eaten, as it did every day but two during the encampment, the patient diners waited until the water rose to an embarrassing height in their plates, when they tipped them up and drained off the flood onto the table.  As the table was already soaking wet the added moisture was not noticed.  All dishes were of tin, and the knives and forks had black wooden handles.  The majority of the meals were eaten in raincoats.  The serving of the meals was done by the Club members in turn, two being appointed each day to act as waiters.  The tents were without floors, and small boards were at a premium for use on the damp ground to step on when getting out of bed.  Canvas cots were used, and, owing to inexperience, bed clothing was none too plentiful." />
                    <BodyText text="The Club remained in camp eight days.  An official record of the catch of fish was kept by the President, all members reporting to him and he judicially supervising the weighing.  The total amounted to six hundred and twenty-five pounds of black bass, pickerel, blue catfish, pike and muscallonge." />
                    <BodyText text="On Sunday, August 13, the Club began its series of services of worship which have been continued without intermission for fifty years.  The first sermon was preached by the Rev. Dr. W.W. Ramsey, then pastor of Christ Methodist Episcopal Church, Pittsburgh.  One hundred and ten persons were present.  In a praise service held that evening, led by Prof. W. H. Slack, eighty persons were in attendance." />
                    <BodyText text="On Saturday, August 19, the party, happy in their new experiences, arrived again in Pittsburgh.  On the return trip the baggage was checked, there being no special car.  By a mistake at Buffalo it was delivered to the connecting lines of the Pennsylvania Railroad and came to Pittsburgh over the Allegheny Valley Railroad.  Delivery was refused on presentation of the checks except on payment of express rate charges.  The attorneys belonging to the Club went into court and suited out writs of replevin, armed with which the Sheriff recovered the impounded baggage.  Amid such mild excitement ended the first Outing of the Iron City Fishing Club." />
                    <BodyText text="On the return of the party, such had been the success of the trip that the Club was considered permanently organized.  The elected officers were continued, with the official addition of Professor Slack as Commissary, and the Club membership was limited to thirty." />
                    <BodyText text="There were no ladies in the camping party the first year.  Mrs. C.C. Scaife and two small sons, Verner and William, were staying at the home of Mr. Monahan, on whose property the Club was camping, and they were often in the Camp and at the Club table." />
                    <BodyText text="Ladies were taken to camp the second year of the Club.  When the matter was first discussed it was proposed to erect a board shanty for them, it being assumed that they would not wish to undergo the hardships of those primitive camps, but they would have none of it.  They insisted on tenting like the rest of us, and they had the time of their lives.  The pioneer lady campers in this camp numbered five, Mrs. J. O. Wood, Mrs. Lee S. Smith, Mrs. J. B. Brobst, Mrs. W. A. Lewis and Mrs. C.C. Scaife." />
                    <SubTitle id="EarlyEncampments" text="Early Encampments" />
                    <BodyText text="The period in the history of the Club covering the wanderings in the wilderness before it came to the promised land which it has so delightfully occupied during the past thirty years, records this list of encampments:" />
                    <BodyText text="This series of nineteen encampments marked a steady growth in the number of campers and an increase in the comforts of camping.  The earlier encampments were seasons of simple and very primitive outdoor life.  Days were spent in fishing.  When evening came the party gathered in the open around a huge campfire of logs, and with songs and story telling, seasoned with much hilarious merrymaking and old-time minstrel fun, the hours passed all too quickly.  When the growth of the Club relegated these old campfire revels to the realm of happy memory something went out which has never been exactly replaced." />
                    <SubTitle id="ThePioneedBuilders" text="The Pioneer Builders" />
                    <BodyText text="During the twenty pioneer years of the life of the Club, as later, the elected and appointed officers were continued with but few changes.  They were the men whose faithful and unrequited labors laid deep and firm the foundations on which their successors have builded so well.  Charles W. Smith as President, Lee S. Smith as Secretary, Samuel L. Wood as Treasurer, and William H. Slack as Commissary, served for many years.  At times during these early years Joseph W. Miles and William H. Slack served as Vice-president.  And not to be forgotten are the labors of James O. Wood as Master of Transportation, in which capacity he did most arduous work; and of “Uncle John” Pollitt as Post Master General and Chief of the Fire Department, to which important offices he brought the dignity of long experience and genial age." />
                    <BodyText text="The cook who did such yeoman service out in the rain on the river bank during the first encampment was Henry Woods, known to all as “Smoke”.  He was an efficient maker of camp meals, and withal a most interesting character.  He continued to preside in the kitchen year after year until 1894, when circumstances made a change advisable.  “Smoke” was a unique personage.  For his ability as a camp cook, his personal traits and his unusual life experiences he is worthy of far more mention that can here be made.  Every pioneer Iron City camper richly enjoys memories of “Smoke”." />
                    <BodyText text="-- Charles H. Smith" />
                    <SubTitle id="Contrasts" text="Contrasts" />
                    <BodyText text="The changes of fifty years have been striking.  The first camp consisted of about thirty people, housed in half a dozen tents.  There were in camp last summer 152 Members and Guests, with about fifty help.  A standard tent of the first camp was 12 by 14 feet and accommodated—more or less—from three to five people.  Bunks of rough lumber and ticks filled with straw sufficed for furniture.  “Lumber for bunks, 50¢; making, 25¢”.  But they were no profiteers.  “Hay for beds at cost”.  In 1897 they became more metropolitan.  The Outing Assessment included “bunks and straw”.  And it is but a few years since the last supply of straw, unused through the advent of springs and mattresses, was dug out from under the Club House." />
                    <BodyText text="The membership has been very tenacious of the rusticity of tent life, and it was not until a  “three day blow” wrecked eight tents one night in 1923 that the building of wooden cabins was countenanced, under strict limitations as to size and outside finish.  The present housing equipment consists of thirty rather luxurious cottages and twenty large tents, and the tents are being replaced by cottages as fast as they reach the end of their usefulness." />
                    <BodyText text="The circus tent dining hall evolved in 1902 into the Club House, which is now equipped with accommodations for 150, with a late type hotel kitchen, adequate refrigeration, power plant etc., and two dormitories for help." />
                    <SubTitle id="SocialLife" text="Social Life" />
                    <BodyText text="The early social life centered around the evening camp fire.  But beware!  “On Motion, the President was instructed to notify all campers that all noises in camp must cease at 10:30 P.M. unless on special occasion of club concert.”  After the advent of the Club House the big, open fireplace furnished the “campfire” and the cleared dining room floor soon raised the specter of dancing.  They wisely decided against government by injunction, and instead “requested the members and friends to refrain from round dancing”.  The building of the Assembly House, later named the Lodge, as a social center, brought in a more liberal mind, and it was resolved “that more latitude should be allowed the young people, especially along the line of dancing, but that absence from camp after hours be strictly curtailed”.  From this the transition to semi-weekly dances and blackface minstrels was easy." />
                    <BodyText text="Under the system of itinerancy which characterize the early encampments, not unnaturally as the founders were Methodist ministers, the tents, and, when they were acquired later, the row boats were stored in a convenient farmer’s barn over the winter and were carted the next summer to the site of the new camp.  This work was a great burden.  An advance party had to go week ahead, select the camp site and put up the tents.  In 1893 it cost $5.00 to store the goods in a farmer’s barn and $10.00 to cart them to the next camp site." />
                    <SubTitle id="SandyBeach" text="Sandy Beach" />
                    <BodyText text="The early camps were on private land without charge.  The club expressed its appreciation to the owner of the land at Deep Bay Point, Sparrow Lake, by paying his taxes on the land.  When the camp was at Go Home Bay the property was acquired by the Madawaska Club, and they demanded $100. for the use of the camp site.  The Club paid it that year, but started a hunt for the fabled sandy beach of which Jerry Monague had boyish recollections of visiting with his father.  Dr. Miles, Capt. T.J. Wood, James L. Klingensmith, with Jerry and his nephew for guides, went in a sail boat from Go Home Bay to Captain Allen Straits, where they camped the first night.  The next morning they rowed to Moon Falls, and the following day they sailed back to one of the small islands in front of our present side, when the glistening sand caught their view and they went over to the beach in row boats.  The location seemed so desirable that they returned to camp at Go Home Bay and a day or two later the camp tug took the officers to inspect the new site.  It was at once decided to locate here the next year, and the camp of 1900 was accordingly at “Sandy Beach near Moon River, Georgian Bay”, where it has been ever since." />
                    <BodyText text="It was coming to this camp that the Masonic Rock was put on the map.  The tug “Masonic”, bringing in the women and children stuck on the reef, and the big sail boat that put out from camp to take them off also stuck on the reef, and the men who stayed on Jubilee Island to come over on the next trip had an all day wait." />
                    <BodyText text="The acquiring of title to the land had its oddities.  The Canadian government would not grant a patent for government land to a foreign corporation, but would grant title to an alien individual, who in turn could transfer a good title to the foreign corporation.  Therefore title to the 194 acres of land, being the shore ends of four quarter sections and embracing just a mile of water frontage, was at acquired by J. Harvey Harrison, at cost of about $3.00 an acre, whereupon it was deeded to the Club corporation which was chartered in 1901." />
                    <BodyText text="At that time we bought from Mr. Breithaupt, who is yet our near neighbor on Woods Bay, for $100., all the timber on the land except the pine.  And in 1907, when it was learned that the pine was to be cut, it cost us $500. to save that from the woodman’s axe." />
                    <BodyText text="With the coming of a permanent location, and the building of the Club House in 1902, a care taker became necessary to protect the larger investment.  William Myers, who still lives on Moon River, was the first care taker, but would not stay longer than a year.  He was succeeded by a procession of Indian care takers.  Enoch Monague for two years, Robert Marsden for four years, “Big Jim” King, the Constable at Christian Island, for five years.  In 1917 the present care taker, Robert McCracken, a Scotch-Irishman, was elected, the most dependable and most satisfactory care taker in our experience." />
                    <SubTitle id="Fires" text="Fires" />
                    <BodyText text="It was during this period that we learned about fires.  Very early in our occupancy of “Sandy Beach” we learned that dry moss will burn, and burn, and burn.  The island we know as Burnt Island, across the bay in front of Camp, took fire either with or without the assistance of some of our campers, and the whole camp turned out and extinguished the fire.  The third day it flamed up again and again we extinguished it.  This happened every few days during the entire encampment and the moss away down between the rocks was smoking when we left for home.  Another year the tent of the colored cook, pitched just beyond the Club House, took fire one in windy afternoon, destroying everything but the cook.  Three years later the “John Lee” steamer burned during the encampment, necessitating our return via scows, a drenching rain and Rose Point.  And shortly after that a forest fire devastated several miles of the shore north of our camp, with smoke so dense that our camp steamer got lost in it, and a heavy rain stopped the fire less than half a mile from our property." />
                    <SubTitle text="The Iron City" />
                    <BodyText text="A club Steamer was a source of great pleasure—and trouble.  At first one was hired simply to haul the party to camp and out again.  In 1897 the Secretary was authorized “to engage a tug boat during the entire camp”.  This service was obtained for $6.00 a day for boat, captain and engineer, the Club to board them.  In 1906 the “Louisa Lee” was bought, and then our troubles began.  The steamer required a licensed pilot and engineer.  Also numerous and expensive repairs.  Also diplomacy.  One day the engineer got mad, stoked up a big fire, clamped down the main shaft so tight that it would not turn, and skipped out.  By good luck someone happened to catch it before the boiler blew up." />
                    <BodyText text="After years of tribulation the “Iron City”, as the “Louisa Lee” had been renamed, was sold for a fraction of its original cost, and for several years a launch and operator were hired each season, Elijah Light, the present owner of Copperhead Hotel and Island, being the most delightful boatmen of them all.  Later our own Caretaker was encouraged to buy a suitable launch, and we pay him for the use of it during the encampment with no responsibility for it the rest of the year." />
                    <SubTitle id="Financing" text="Financing" />
                    <BodyText text="The early camp was for a period of one week, which by stages has been lengthened to seven.  The cost of living at the first camp was $9.00.  In 1890 the assessment was fixed at $30.00, which, after paying $14.35 for the railroad fare and $1.50 each way for the Pullman, left $12.65 for living expenses for the two weeks in camp.  And they flourished on it.  The charge for “rowers”, (they scorned “guides” in those days) was 50¢ a day.  It was not until 1902 that they jumped the rate on “guides” to 25¢ a meal.  And the daily wage of the slavey was $1.50." />
                    <BodyText text="Annual Dues were fixed at $2.00 by amendment to the Constitution in 1890.  A deficit at the end of the year was a frequent occurrence.  The first Special Assessment was proposed at $8.00 in 1899, but its visage was too frightful so they gave a note instead.  Compare these figures with a Outing Assessment of $245, annual dues of $50., and Special Assessments of $100., and you will see how far the expansion of this age has taken us." />
                    <SubTitle id="WaterTransportation" text="Water Transportation" />
                    <BodyText text="The primitive motive power was an “ash breeze” applied either to a rowboat or a canoe, and a fishing trip started at four o’clock A.M., to afford time for the “breeze” to function and reach the fishing grounds in due time.  The original row boats, bought in 1898, cost $15, and some of them are still in service.  But row boats have almost entirely disappeared except as tenders to motor boats.  The first gasoline propelled launch was brought to camp by Henry Tranter in 1907, and he spent three weeks out of the four trying to make it go.  Those “one lungers” would run about six miles an hour under favorable circumstances, but they were exceedingly temperamental.  The latest type of motor boat, resplendent in polished mahogany and silver, will jerk you over the water at a speed of forty-five miles an hour, and your pleasure trip is done before it’s well begun.  The strength of its 200 horses represents the growth of the original horse-and-a-half in twenty years." />
                    <BodyText text="The early camps were on small interior lakes, and the port of embarcation was frequently the railroad station on the Severn River.  When the camps were pitched on the shores of Lake Huron the route changed to Penetang and a chartered steamer of some size to take the party directly to camp.  The “City of Toronto” was the first of these larger steamers.  The arrangement was quite convenient.  Upon the arrival of the party at Penetang at daylight the steamer then took them across the bay to the Penetanguishene Hotel, a very elaborate summer hotel for that kind region. While the people were eating breakfast the baggage was being loaded on the steamer, and the lake trip started immediately after breakfast." />
                    <BodyText text="Later the “John Lee” was chartered for the purpose, and after it burned, arrangements were made with the Northern Navigation Company to have the steamer “Waubic” branch off its regular run to Parry Sound to Jubilee Island and take us in to our dock.  The “Waubic” made the run between Penetang and Parry Sound under contract with the Grand Trunk railroad, but the service never paid expenses, and as soon as the contract expired the Northern Navigation Company refused to renew it." />
                    <BodyText text="That left a considerable tourist territory without water transportation, and no other means was possible.  Immediately considerable rivalry arose between Penetang and Midland on the south, and Parry Sound on the north, as to a boat line for this service, the railroad agreeing to make its port the town that furnished the service.  Both Midland and Penetang formed boat lines, but the Midland boat was far the better and the two were finally combined in the Midland Company, the “Georgian Bay Tourist Company” whose steamer, “City of Midland” has given us the best service we ever had." />
                    <SubTitle id="Fishing" text="Fishing" />
                    <BodyText text="Fishing was the end of existence to the “fathers”.  In 1894 a report of a license fee of $5.00 on each male member caused a hasty and unanimous decision not to go to Canada.  But other information that this law did not apply in the Muskoka District, the decision was reconsidered.  The first license fee was $2.00, with a family rate of $3.00.  But families increased so marvelously that the rate was discontinued the following year.  But war time exigency raised the rate to $5.50 per capita, wherein is pegged.  At one time the Secretary was given books of blank licenses, to be issued as needed; but now no one may touch the blanks but a sworn agent, and he must record the color of your eyes, the condition of your teeth and the number of unmarried sisters in the family." />
                    <BodyText text="Being a law-abiding people, a Committee was appointed in 1896, consisting of Dr. Miles, Jesse Jones and Professor Harry Horner, “to report on the fishing laws of Canada and enforce them during our encampment”.  There is no record that they ever arrested anyone for violating the law." />
                    <BodyText text="As time progressed, and the membership became soft and slept late, the sturdy pioneer rebelled, and, beginning in 1896, by giving previous notice, he-men could have six o’clock breakfast and get to fishing at a sensible hour." />
                    <BodyText text="The pioneer fishing trip was an all-camp party.  With but one steamer, everybody towed behind.  But now the fishing trip has become a rock dinner, starting before noon—sometimes—and caparisoned with cushions, camp chairs and card tables.  A few of the Mid-Victorians still fish, and enjoy it; but fishing is no longer de rigueur. “O tempora, O mores!” [Alas, for the times and the manners!]" />
                    <BodyText text="There are those in camp yet who remember when Johnny Hawk paddled his squaw and papoose from Christian Island to camp in a birch bark canoe, and sold the birch bark canoe to one of the campers for the unheard of extravagance of $20." />
                    <SubTitle id="Athletics" text="Athletics" />
                    <BodyText text="There has always been an element that wanted more diversion than merely fishing.  When the present property was purchased, 1901, a tennis court was built, and surfaced with clay brought from Penetang, and tennis is still one of the outstanding sports of camp life.  A croquet ground was also laid out, and for years it was the chief land sport.  But the site has been smoothed up for a soft ball field now, and last year witnessed the first contest with an outside team in which we came in second best.  A team of Indians from Christian Island did things to our team that very greatly surprised them." />
                    <BodyText text="Base Ball had its innings, and for some years our ball players went to Parry Sound once a year and trimmed them—with the assistance of what college players we could pick up in our immediate vicinity.  Our enthusiasm even led to clearing up a ballpark a short distance out the Twosers Trail, but the sand would not grow a good sod and the underbrush grew too rapidly, and the venture was never a success." />
                    <BodyText text="One year some golf enthusiasts brought up some floating balls and driving out into the lake with Indian caddies in canoes was a great sport.  The later golf bugs go to Parry Sound to play, where they have very satisfactory links with unmatched scenery." />
                    <BodyText text="To catch them early, swings and slides and teeter boards were provided for the small children—and mostly monopolized by the larger ones! Wonderful the fun the grown up kids got out of it." />
                    <SubTitle id="SanitationHealth" text="Sanitation & Health" />
                    <BodyText text="The health of the camp has always been matter of especial care.  From the very early days a Camp Physician has been taken along to look after the health of the campers without charge.  Of recent years, when the larger attendance has brought on problems of the denser settlement, a committee of physicians who has had general sanitary conditions under their particular control, the water supply has been frequently tested, the disposal of the kitchen refuse watched, and generally a first className Board of Health maintained.  Two physicians have been outstanding in his work as Camp Physicians.  Dr. J.J. Thomas, of Youngstown, O., until 1913, when membership in the national executive body of his Church required his presence at its meetings; and from 1913 until the condition of his health interfered, 1930, Dr. Stewart L. McCurdy.  Dr. McCurdy was especially valuable as Camp Physician, because our great threat is not so much disease as accident, and his experience as a railroad surgeon stood us in good stead on many occasions.  And yet a few serious cases have been met.  One girl developed typhoid fever the day after her arrival, and was carried through the fever in camp and taken home well.  A case of appendicitis developed at another time, and had to be taken to the hospital.  One year the colored cook from a nearby camp cut an artery and Dr. McCurdy stood between her and death.  Another time some men came eighty miles by canoe from a lumber camp with a broken leg for our Camp Physician to heal.  But in all the years of our camp life we have been spared a serious accident or fatality, largely because of these precautions and, as we like to believe, because our ethical standards in camp are kept on the home basis." />
                    <SubTitle id="Maps" text="Maps" />
                    <BodyText text="The original camp on the present grounds was pitched in a triangle extending from the clubhouse along “Rattle Snake Row” to a point just beyond the present walk from the bathing beach to the tennis courts, with a triangle between that and the lake.  The tents were so close together that their guy ropes interfered and there was nothing even resembling privacy.  The Caretaker’s house was on the shore near the site of the Lodge and beautiful pine grove beyond was the Indian camp.  After several proposals for a broader lay-out, for the original proposal of which Walter Miles should receive the credit, it was finally determined, in 1916, to put the Indians and the Caretaker on the back bay and extend the row of tents along the shore to the Island, with a clear space between tents of eighteen feet, eliminating all the tents in front of “Rattle Snake Row”." />
                    <BodyText text="The first island was purchased with this plan in mind, and it was at first the Mecca of the clerical brethren and known as Dominie Island.  The camping of a family of undesirables on Huckleberry Island one summer demonstrated the danger of unoccupied property near our camp, and we promptly bought the other two islands immediately opposite our shore line." />
                    <BodyText text="The first map of the camp was drawn by Magnus Pflaum in 1908.  In 1910 Elmer K. Hiles, then Secretary of the Engineers Society of Western Pennsylvania, amplified this map.  In 1918 Richard Hirsch, Designing Engineer of the Kirke Porter Locomotive Works, made an actual survey of the camp in a large plot which in 1929 was brought up to date by W. Archie Weldin.  The first attempt to map the adjacent waters was made by J. Walter Miles and Johnny Hawk in 1909, and a very accurate map of the bay and the islands was the result of their summer cruising.  The Canadian government made a thorough survey in 1912, and last year a map of the whole territory was made by aerial photography.  This last is especially interesting as it gives us our first accurate information as to the land “back in the bush”." />
                    <SubTitle id="Membership" text="Membership" />
                    <BodyText text="The reception of new members has always been fenced about with restrictions.  Election was by ballot, and it required a three-fourths vote to elect.  In 1896 election to membership was refused to two pretty prominent Pittsburghers, one of whom was later accepted.  In recent years there has been added the requisite that the applicant must have attended a previous encampment and proved congenial." />
                    <BodyText text="The membership limit was fixed in the first organization at thirty.  In 1889 the limit was raised to forty, and the number was increased to fifty when the Club was incorporated in 1901." />
                    <BodyText text="In 1916, when it was realized that the number of ministers in the membership was running low, with a desire to maintain that element of our social life, five ministerial memberships were authorized, at nominal cost and dues and without property interest.  This number was later increased to ten, but more than five have never yet been outstanding." />
                    <BodyText text="Some question has been raised recently as to the rule adopted in 1925 limiting Membership Outing Rates to two persons of the Member’s family, claiming it to be an objectionable innovation.  In 1894, and possibly earlier, the Member’s rate applied only to the individual Member, all his family paying the higher rate.  Later there were three rates applied, one for the Member, a higher one for his family, and a still higher one for “Visitors”." />
                    <SubTitle id="MasonicVisitation" text="Masonic Visitation" />
                    <BodyText text="The Masonic fraternity has always had a considerable representation among the membership, some of whom have attained high rank.  These have included the presiding officer of the national body of Knights Templar, to presiding officers of the state body in Pennsylvania, and more than a dozen 33° Masons.  In 1927 our Club had the pleasure of entertaining the Grand Master of the Grand Lodge of Canada, Hon. John A. Rowland, accompanied by an escort of Granite Lodge, Parry Sound." />
                    <SubTitle id="LiteraryGenius" text="Literary Genius" />
                    <BodyText text="There has been a great deal of literary talent in our camp.  There may be some question as to the literary value of the Club Yell, of which Dr. Miles gets the credit for being the perpetrator-in-chief, but there can be no question as to the Club Song, of which Mrs. Rev. Thos. R. Thoburn is the gifted author.  And last summer we had a real poet laureate, Mr. Bennett Chapple, from whose poetic musings we reproduce several examples." />
                    <SubTitle id="Sabbath" text="The Sabbath" />
                    <BodyText text="With all the comforts, even luxuries, of today, one characteristic of the first camp has persisted in its full vigor throughout our whole history.  Sunday is the Sabbath, whether at home or in camp.  From the first Sunday of the first camp there has never been an omission of the service of worship in camp on Sunday throughout the entire fifty years.  Our Club has a reputation throughout Canada for “remembering the Sabbath Day”.  Under the shadow of these principles we have been preserved without a serious accident through all these years.  And we take a proper pride in maintaining these standards." />
                    <SubTitle id="Officers" text="Officers" />
                    <BodyText text="Long tenure of office has been characteristic of the Club.  There was substantially no change in officers during the first fifteen years.  In the half-century of its existence it has had but two Presidents, Bishop Smith from its inception to the time of his death in 1915, and W.S. Horner from that time to the present." />
                    <BodyText text="For Secretaries, Lee S. Smith, brother of the Bishop, was Secretary until 1896; Will Price from 1896 to 1900; S.C. Johnston from 1900 to 1904; John W. MacGregor from 1904 to 1906; W.S. Horner from 1906 to 1910; and Sion B. Smith from 1910 to the present." />
                    <BodyText text="Samuel L. Wood was Treasurer until 1904.  W.S. Horner then served for two years, J. Frank Miller for four years, B.W. Lewis for four years, and Sidney F. Murphy for four years.  At the death of Mr. Murphy the offices of Secretary and Treasurer were combined." />
                    <BodyText text="William H. Slack was Vice-President and Commissary until 1896, when Benjamin Dangerfield was elected Commissary.  With the advent of a permanent location came more effective business methods.  Charles L. Smith, son of the first President, served as Commissary from 1901 to 1908, when Elmer L. Kidney succeeded him.  It was under the latter that our present voucher system of accounting was adopted.  In 1916 John F. Jose, who had been assistant to Mr. Kidney, became Commissary, and has handled the complexities of the modern commissary department with efficiency and satisfaction ever since." />
                    <SubTitle id="AirAge" text="The Air Age" />
                    <BodyText text="So much for the past.  A new era opened for the Iron City Fishing Club last summer, the air age.  We were very much surprised to have a big six passenger cabin plane of the Inter-Lake Airways, Ltd., of Toronto, drop in the bay in front of our Clubhouse at the dinner hour one quiet Saturday.  It soon developed at the visit was part of a publicity program of the Company, which is planning regular service between Toronto, Penetang and Parry sound.  In a very short time the bird men were taking up parties of our campers for short flights, and the passenger service to Iron City camp was inaugurated that same evening by the homeward flight of Mr. and Mrs. John W. Vickerman, Jr., from camp to Penetang.  The visit was so successful that the plane played a return engagement the following Monday, when another bunch of campers became air minded.  And there was serious discussion of the possibility of service between Toronto and Camp via airline the coming season." />
                    <SubTitle id="IronCityOfToday" text="Iron City of Today" />
                    <BodyText text="The gradual growth away from the pioneer ideal of “roughing it” in the wilds, and toward the more material comforts and a modern summer home, may be traced to the period quite closely coincident with the presidency of Mr. Horner.  Before that period greater comfort in traveling style had become the rule.  Through trains with special Pullman and baggage cars, special dining car, and the boat trip into our own dock, took practically all the burden of responsibility off the traveler.  But greater comforts and camp were just beginning to emerge.  The first noticeable change was the extension of the circle of tents from the huddle in front of the Club House around the crescent and through the Pine Woods to the point and across to the Island.  This enabled the elimination of all tents between the crescent and the water, and the spacing of the tents far enough apart to give some privacy." />
                    <BodyText text="Along with this development there was a change in the financial policy of the Club away from strict economy, with its constant and pestiferous deficits and consequent assessments, toward a somewhat more expensive and decidedly more comfortable basis, where known and anticipated expenses were budgeted and the income set to meet then.  It has been a good many years since the Club paid a debt with an note, a practice that was quite prevalent previously." />
                    <BodyText text="The most significant feature of this development was the Lodge, built almost entirely with voluntary contributions.  Located at the center of the larger circle, it was easily accessible from all parts of the camp.  It furnished a distinct social center for those activities of the Club which had theretofore of necessity trespassed somewhat on the Dining Room.  And the design and character of the furnishings of the Lodge emphasized the change in social ideals, being more closely related to the standards of club life." />
                    <BodyText text="The last step in the development of the camp has been the change from tent to cottage.  This has brought in its train more of the refinements of home life, running water and the cottages, electric lights along the walks and in the Club House and Lodge, and even the supplanting of the rather deciduous boardwalks by concrete.  Indeed the camp has become no longer a place for a temporary outing, but the best sense of the word a summer home, with all the comforts, conveniences and permanence the word implies.  And as a direct result, the term of the outing has increased to seven weeks, and some of the Members even stretch that a week or two at either end." />
                </div>
                <div>
                    <div style={{ marginLeft: 12 }} className="panel panel-default">
                    <div className="panel-heading">Table of Contents</div>
                        <ul className="list-group">
                            {pageSections.map((pageSection, index) => {
                                return (
                                    <Link
                                        className="list-group-item"
                                        key={index}
                                        to={pageSection.pageSection}
                                    >
                                        {pageSection.pageName}
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                    {tables.map((table, index) => {
                        return (
                            <div>
                                <SubTitle style={{ marginLeft: 12 }} text={table.title} />
                                <TableContainer className={classes.tableContainer} key={index} component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{width: "20px", fontSize: "14px"}}>Year</StyledTableCell>
                                            <StyledTableCell style={{width: "20px", fontSize: "14px"}} align="right"></StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {table.data.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell style={{width: "20px"}} component="th" scope="row">
                                                    {row.year}
                                                </StyledTableCell>
                                                <StyledTableCell  style={{width: "20px"}} align="right">{row.text}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                    )})}
                </div>
            </div>
        </div>
    )
}
