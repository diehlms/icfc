import React from 'react'
import Title from "../../shared/Title"
import HorizontalLine from '../../shared/HorizontalLine'

export default function CustomsTraditions() {
    return (
        <div className="containerMain">
            <Title 
                text="Customs & Traditions"
            />
            <HorizontalLine />
        <em>Iron City Fishing Club had its origin in 1881. It had then and still has religious overtones and a few established traditions that have made it and kept it the happy summer retreat it is.</em>
        <p><strong>IT IS TRADITIONAL</strong> for all campers to attend the Sunday morning devotional service in the dining room following breakfast and the regular Vespers Service in the Lodge at eight o'clock.</p>
        <p><strong>IT IS TRADITIONAL</strong> not to fish on Sunday and to keep a quiet bay by reserving it for canoes and sailboats. The use of powerboats for necessary transportation may, of course, be undertaken.</p>
        <p><strong>IT IS TRADITIONAL</strong> for every member and guest to share in keeping the Camp grounds free of litter and to keep the area surrounding their own cottage neat and trim.</p>
        <p><strong>IT IS TRADITIONAL</strong> for campers and guests to make every effort to modulate voices and all other sounds in order to ensure a quiet camp after eleven o'clock in the evening.</p>
        <p><strong>IT IS TRADITIONAL</strong> not to bring in any smallmouth bass under 12" in length. Should a smaller fish have been so badly hurt it will die, that fish is to be counted as one of Canada's legal limit of six smallmouth bass per day per person.</p>
        <div className="section-title"><strong>Swim Tests</strong></div>
        <div className="swim-tests">
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Baby Minnow</strong></div>
                <ol>
                    <li>Dive or jump from the dock.</li>
                    <li>Swim 15 yards, turn around and start back.  Halfway back, stop, and either float on back or tread water for 1 minute.</li>
                    <li>Swim back to dock.</li>
                </ol>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Minnow</strong></div>
                <ol>
                    <li>Dive or jump from the dock.</li>
                    <li>Swim 15 yards, turn around and start back.  Halfway back, stop, and either float on back or tread water for 1 minute.</li>
                    <li>Swim back to dock.</li>
                    <li>Once passed you no longer have to wear your lifejacket on the dock.</li>
                </ol>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Bass</strong></div>
                    <ol>
                        <li>Dive or jump from the dock.</li>
                        <li>Swim 3 body lengths under water.</li>
                        <li>Surface and tread water for 3 minutes.</li>                    <li>Swim to float dock, either crawl or back stroke. (Do not stop at the floating dock).</li>
                        <li>In the water, put on a life jacket and float in front or back position</li>
                        <li>From the dock, demonstrate rescue techniques; reaching with the pole, throwing the ring buoy or a life jacket to a victim.</li>
                    </ol>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Pike</strong></div>
                    <ol>
                        <li>Swim 3 different strokes to floating dock and back.</li>
                        <li>Tread water for 10 minutes.</li>
                        <li>Throw rescue buoy to lifeguard and pull in.</li>
                    </ol>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Musky</strong></div>
                    <ol>
                        <li>Running shallow front dive.</li>
                        <li>Swim 3 laps (back and over is 1) to main dock. The lifeguard will flag you in a kayak.</li>
                    </ol>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Shark</strong></div>
                    <ul>
                        <li>One way to Pikes Peak.  </li>
                    </ul>
                    <div className="swim-test-subtext"><small>(One kayak/canoe per swimmer and one motor boat for the swimmer or for an entire group of swimmers).</small></div>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Whale</strong></div>
                    <ul>
                        <li>Out and back to Pikes Peak.</li>
                    </ul>
                    <div className="swim-test-subtext"><small>(One kayak/canoe per swimmer and one motor boat for the swimmer or for an entire group of swimmers).</small></div>
            </div>
            <div className="panel panel-success">
                <div className="panel-heading"><strong>Killer Whale</strong></div>
                    <ul>
                        <li>Out and back to Pikes Peak without stopping.</li>
                    </ul>
                    <div className="swim-test-subtext"><small>(One kayak/canoe per swimmer and one motor boat for the swimmer or for an entire group of swimmers).</small></div>
            </div>
        </div>
        </div>
    )
}
