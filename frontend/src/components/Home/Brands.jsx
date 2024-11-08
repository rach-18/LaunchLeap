import { useState, useRef } from "react";

function Brands() {
    const row1 = [
        {
            src: 'https://logos-world.net/wp-content/uploads/2020/10/Dropbox-Logo.png',
            subtitle: 'Referral Programs'
        },
        {
            src: 'https://logos-world.net/wp-content/uploads/2022/05/DuckDuckGo-Logo.png',
            subtitle: 'Content Marketing, PR'
        },
        {
            src: 'https://www.logotypes101.com/logos/233/D0B1983836EC01E6825ACC8AFE3C2269/unbounce.png',
            subtitle: 'Speaking Engagements, Conferences'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cDij_wMx0gvo2c-nl44XKt_1FZKArFQ0fw&s',
            subtitle: 'Community Building'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX9wEYs4xLVdbBTp4E70ZqZsVjfl-hKrSoqg&s',
            subtitle: 'Viral Marketing, Platform Partnerships'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAnhm7KV1tGkrxOXa21zvhlIZNJuHWCCTxJg&s',
            subtitle: 'Event Marketing, Targeted Launches'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFJP7X_crOPPYfdGyvHw8KhkxswWPubv8P4w&s',
            subtitle: 'Public Relations, Thought Leadership'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdjg1hBd_eLSwYlagIwVs_QaqQStywICzRw&s',
            subtitle: 'SEO, Content Marketing'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJjk59d2BOqsxIuk-GRayeOKzzI-4gVN4xSQ&s',
            subtitle: 'Word of Mouth, Product-Led Growth'
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Groupon_Logo.svg/1200px-Groupon_Logo.svg.png',
            subtitle: 'Email Marketing'
        }
      ];

    const row2 = [
    {
        src: 'https://www.digital.ink/wp-content/uploads/airbnb_logo_detail.jpg',
        subtitle: 'Community Building (Craigslist Integration)'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtI_yK4UC7wDHbTNUDBdhStYfQxmvQhqjHyQ&s',
        subtitle: 'Content Marketing'
    },
    {
        src: 'https://seeklogo.com/images/I/intuit-mint-logo-92F55206BA-seeklogo.com.png',
        subtitle: 'PR, Content Marketing'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8LAui-u9PdMQs0ss1E2Qf-K5eOTMFyRnPmw&s',
        subtitle: 'Partnerships'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtPSBhKUt_kP3BdfCGRl6pQx4zIuF2NCiGQ&s',
        subtitle: 'Freemium Model, Content Marketing'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgDC5KbVCgEGLQgwB22LXxPNb4jBvyHwLmw&s',
        subtitle: 'Content Partnerships'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmbSgkDcLpIHHFzkezjC9coeNzdOdRRCZtw&s',
        subtitle: 'Content Marketing, Guest Blogging'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqcIXa4n7LgdCYEf7AUT_qdd1LX7i_kJwig&s',
        subtitle: 'Local Launches with Incentives'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR220T_fujNoXwRqi349C8BhjDieJJN0Vgd1w&s',
        subtitle: 'Customer Engagement, Community Building'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNYVu8QBnM5-axhsSPKGM05j4RYN6pxlFVuw&s',
        subtitle: 'SEO, Influencer Partnerships'
    }
    ];

  return (
    <>
      <div className="mt-20 w-11/12 mx-auto">
        <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">
          Brands Thriving with Unconventional Marketing
        </h2>
        <div className="marquee flex w-full select-none overflow-hidden mt-5">
            <div className="marquee-group shrink-0 flex items-center gap-5 justify-around whitespace-nowrap">
                {row1.map((el, index) => {
                    return (
                        <div key={index} className="image-group flex flex-col gap-2 items-center">
                            <img
                                className="object-contain rounded-lg aspect-video"  // Fixed width and height
                                src={el.src}
                                alt={el.subtitle}  // Adding alt text for accessibility
                            />
                            <p className="text-center sm:text-sm text-xs w-11/12 text-wrap">{el.subtitle}</p>
                        </div>
                    );
                })}
            </div>
            <div className="marquee-group shrink-0 flex items-center gap-5 justify-around whitespace-nowrap">
                {row1.map((el, index) => {
                    return (
                        <div key={index} className="image-group flex flex-col gap-2 items-center">
                            <img
                                className="object-contain rounded-lg aspect-video"  // Fixed width and height
                                src={el.src}
                                alt={el.subtitle}  // Adding alt text for accessibility
                            />
                            <p className="text-center sm:text-sm text-xs w-11/12 text-wrap">{el.subtitle}</p>
                        </div>
                    );
                })}
            </div>    
        </div>
        <div className="marquee flex w-full select-none overflow-hidden">
            <div className="marquee-group2 shrink-0 flex items-center gap-5 justify-around whitespace-nowrap">
                {row2.map((el, index) => {
                    return (
                        <div key={index} className="image-group flex flex-col gap-2 items-center">
                            <img
                                className="object-contain rounded-lg aspect-video"  // Fixed width and height
                                src={el.src}
                                alt={el.subtitle}  // Adding alt text for accessibility
                            />
                            <p className="text-center sm:text-sm text-xs w-11/12 text-wrap">{el.subtitle}</p>
                        </div>
                    );
                })}
            </div>
            <div className="marquee-group2 shrink-0 flex items-center gap-5 justify-around whitespace-nowrap">
                {row2.map((el, index) => {
                    return (
                        <div key={index} className="image-group flex flex-col gap-2 items-center">
                            <img
                                className="object-contain rounded-lg aspect-video"  // Fixed width and height
                                src={el.src}
                                alt={el.subtitle}  // Adding alt text for accessibility
                            />
                            <p className="text-center sm:text-sm text-xs w-11/12 text-wrap">{el.subtitle}</p>
                        </div>
                    );
                })}
            </div>    
        </div>
      </div>
    </>
  );
}

export default Brands;
