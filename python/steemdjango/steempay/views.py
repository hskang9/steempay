from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.mail import send_mail
from steem import Steem



class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)
    

def submit(request):
        if request.method == 'POST':
            node = "https://api.steemit.com"
            keys=['---',request.POST['wif']] 
            # initialize Steem class
            s = Steem(node, keys=keys)
            
            # Buyer's steemit account
            sender = request.POST['from']

            # your steemit account
            recipient = ''

            # You can choose SBD or Steem
            asset = 'SBD'

            # price in Steem or steem dollar
            amount = 1.000

            memo = request.POST['memo']

            s.transfer(recipient, amount, asset, memo=memo, account=sender)


            # send receipt with SMTP server
            send_mail(
                'Receipt',
                'now testing',
                'from@example.com',
                request.POST['email'],
                fail_silently=False,
            )


            
            
        return render(request, 'submitted.html', context=None)

