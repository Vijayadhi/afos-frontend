import React from 'react'

function HeaderComponent() {
    return (
        <>
            <header>

                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3"></button>

                    </div>
                    <div className="carousel-inner">
                        
                        <div className="carousel-item active" style={{ backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9004260.jpg&f=1&nofb=1&ipt=000013ff51892faee6fd1d8016f7303fbf9add3d3f8ec9ec4366840936da7f83&ipo=images')" }}>
                            <div className="carousel-caption">
                                <h5>First slide label</h5>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </div>
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffacts.net%2Fwp-content%2Fuploads%2F2023%2F07%2F19-facts-about-spirit-airlines-1690008228.jpg&f=1&nofb=1&ipt=5576ce19775afc9d2e96ecabd3b9ed1d16a60e29dd4e63ac980069be59cfbd3d&ipo=images')" }}>
                            <div className="carousel-caption">
                                <h5>Second slide label</h5>
                                {/* <p>Some representative placeholder content for the second slide.</p> */}
                            </div>
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F254367.png&f=1&nofb=1&ipt=37f3ed1fde63cd0dba7ef828385ac29c3fa76e88badf8cee170a1f776b1e4515&ipo=images')" }}>
                            <div className="carousel-caption">
                                <h5>Third slide label</h5>
                                {/* <p>Some representative placeholder content for the third slide.</p> */}
                            </div>
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://static.collegedekho.com/media/img/institute/logo/rgeg5ggg.jpg')", weidth: 20+'px', }}>
                            <div className="carousel-caption">
                                <h5>First slide label</h5>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </header>

            {/* <!-- Page Content --> */}

        </>
    )
}

export default HeaderComponent