export const pricingdata = [
    {
        icon: '/pricing/basic.png',
        title:'Basic plan',
        amount: '$2.5/mth',
        points: [
            'Access to all features',
            '3 projects',
            '500 crawler credits per month',
            '800 keyword credits per month',
            'Update frequency: 2 weeks'
        ],
        fn: ()=> console.log('Hello Basic')

    },
    {
        icon: '/pricing/pro.png',
        title:'Pro plan',
        amount: '$7.5/mth',
        points: [
            'Access to all features',
            '10 projects',
            '8,000 crawler credits per month',
            '4,000 keyword credits per month',
            'Update frequency: weekly'
        ],
        fn: ()=> console.log('Hello Pro')

    },
    {
        icon: '/pricing/advanced.png',
        title:'Basic plan',
        amount: '$15/mth',
        points: [
            'Access to all features',
            '30 projects',
            '40,000 crawler credits per month',
            '30,000 keyword credits per month',
            'Update frequency: Weekly'
        ],
        fn: ()=> console.log('Hello Advanced')

    }
]

export const faqdata = [
    {
        title: 'Is there a free trial available?',
        answer: 'Yes, we offer a free trial for our SEO services. It allows you to explore the features and benefits of our platform before deciding on a subscription plan.'
    
    },
    {
        title: 'Can I change my subscription plan?',
        answer: 'Of course. You can upgrade or downgrade your subscription plan at any time to better suit your evolving needs. Changes will take effect during the next billing cycle.'
    },
    {
        title: 'What is your cancellation policy?',
        answer: "We understand that things change. You can cancel your subscription at any time. If you cancel during a billing cycle, you'll continue to have access to the service until the end of that billing period."
    },
    {
        title: 'Are there any hidden fees or extra charges?',
        answer: "No, we believe in transparent pricing. There are no hidden fees or extra charges beyond what is outlined in your selected subscription plan. You'll only pay the agreed-upon amount based on your chosen features and usage."
    },
    {
        title: 'How does billing work?',
        answer: "Billing for our SEO services is straightforward and transparent. When you subscribe to one of our plans, you'll be billed according to the selected billing cycle—either monthly or annually."
    },
    {
        title: 'Is there a refund policy in place?',
        answer: "Yes, we have a refund policy. If you are dissatisfied with our services within the first [X] days of your subscription, you can request a refund. Please refer to our refund policy for detailed information."
    },
    
] 