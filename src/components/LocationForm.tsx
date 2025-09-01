import { useState } from 'react';
import { FormStep } from './FormStep';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Locate } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  district?: string;
  block?: string;
  gpsCoordinates?: { latitude: number; longitude: number };
  gpsDetected?: boolean;
  [key: string]: any;
}

interface LocationFormProps {
  formData: FormData;
  updateFormData: (data: FormData) => void;
}

export const LocationForm = ({ formData, updateFormData }: LocationFormProps) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const { toast } = useToast();

  const odishaDistricts = [
    'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack',
    'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur',
    'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khurda',
    'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
    'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
  ];

  const blocks = {
    'Angul': ['Angul', 'Athamallik', 'Banarpal', 'Chhendipada', 'Kaniha', 'Kishorenagar', 'Pallahara', 'Talcher'],
    'Balangir': ['Balangir', 'Belpada', 'Deogaon', 'Loisinga', 'Muribahal', 'Patnagarh', 'Saintala', 'Titlagarh'],
    'Balasore': ['Balasore', 'Bampada', 'Basta', 'Bhograi', 'Jaleswar', 'Khaira', 'Nilagiri', 'Oupada', 'Remuna', 'Simulia', 'Soro'],
    'Bargarh': ['Bargarh', 'Ambabhona', 'Attabira', 'Bhatli', 'Bheden', 'Bijepur', 'Gaisilet', 'Jharbandh', 'Padampur', 'Paikmal', 'Sohela'],
    'Bhadrak': ['Bhadrak', 'Basudevpur', 'Bonth', 'Chandabali', 'Dhamnagar', 'Tihidi'],
    'Boudh': ['Boudh', 'Harbhanga', 'Kantamal', 'Manamunda', 'Purunakatak'],
    'Cuttack': ['Cuttack', 'Athagarh', 'Banki', 'Baranga', 'Dampara', 'Kantapada', 'Kishannagar', 'Mahanga', 'Narasinghpur', 'Niali', 'Nischintakoili', 'Salepur', 'Tangi-Choudwar'],
    'Deogarh': ['Deogarh', 'Barkote', 'Reamal', 'Tileibani'],
    'Dhenkanal': ['Dhenkanal', 'Bhuban', 'Gondia', 'Hindol', 'Kamakhyanagar', 'Kankadahad', 'Odapada', 'Parjang'],
    'Gajapati': ['Paralakhemundi', 'R.Udayagiri', 'Rayagada', 'Mohana', 'Nuagada', 'Gumma', 'Gosani'],
    'Ganjam': ['Berhampur', 'Aska', 'Bellaguntha', 'Bhanjanagar', 'Buguda', 'Chhatrapur', 'Chikiti', 'Digapahandi', 'Ganjam', 'Hinjilicut', 'Jarada', 'Kabisuryanagar', 'Khallikote', 'Patrapur', 'Polasara', 'Purusottampur', 'Rangeilunda', 'Sanakhemundi', 'Sheragada', 'Surada'],
    'Jagatsinghpur': ['Jagatsinghpur', 'Balikuda', 'Biridi', 'Erasama', 'Kujang', 'Naugaon', 'Raghunathpur', 'Tirtol'],
    'Jajpur': ['Jajpur', 'Bari', 'Binjharpur', 'Dasarathpur', 'Dharmasala', 'Jajpur Road', 'Korei', 'Rasulpur', 'Sukinda'],
    'Jharsuguda': ['Jharsuguda', 'Brajrajnagar', 'Kirmira', 'Kolabira', 'Laikera'],
    'Kalahandi': ['Bhawanipatna', 'Dharamgarh', 'Jaipatna', 'Junagarh', 'Kegaon', 'Kesinga', 'Kokasara', 'Lanjigarh', 'M.Rampur', 'Narla', 'Thuamul Rampur'],
    'Kandhamal': ['Phulbani', 'Baliguda', 'Chakapada', 'Daringbadi', 'G.Udayagiri', 'Khajuripada', 'Kotagarh', 'Phiringia', 'Raikia', 'Tikabali', 'Tumudibandha'],
    'Kendrapara': ['Kendrapara', 'Aul', 'Derabish', 'Garadpur', 'Kendrapara', 'Mahakalapada', 'Marsaghai', 'Pattamundai', 'Rajkanika', 'Rajnagar'],
    'Kendujhar': ['Keonjhar', 'Anandapur', 'Banspal', 'Barbil', 'Champua', 'Ghatgaon', 'Harichandanpur', 'Hatadihi', 'Joda', 'Karanjia', 'Kendujhar', 'Patna', 'Saharpada', 'Telkoi'],
    'Khurda': ['Bhubaneswar', 'Khurda', 'Jatni', 'Balianta', 'Begunia', 'Bolagarh', 'Chilika', 'Tangi'],
    'Koraput': ['Koraput', 'Baipariguda', 'Bandhugaon', 'Boipariguda', 'Dasmantpur', 'Jeypore', 'Kotpad', 'Kundra', 'Lamtaput', 'Laxmipur', 'Narayanpatna', 'Nandapur', 'Pottangi', 'Semiliguda'],
    'Malkangiri': ['Malkangiri', 'Chitrakonda', 'Kalimela', 'Khairput', 'Korukonda', 'Kudumulgumma', 'Malkangiri', 'Mathili', 'Podia'],
    'Mayurbhanj': ['Baripada', 'Badampahar', 'Bangiriposi', 'Baripada', 'Betanoti', 'Bhadrak', 'Bijatala', 'Bisoi', 'Gopabandhunagar', 'Jashipur', 'Karanjia', 'Khunta', 'Kuchinda', 'Kuliana', 'Moroda', 'Rairangpur', 'Rasagovindpur', 'Samakhunta', 'Saraskana', 'Sukruli', 'Thakurmunda', 'Udala'],
    'Nabarangpur': ['Nabarangpur', 'Chandahandi', 'Dabugaon', 'Jharigaon', 'Kosagumuda', 'Nandahandi', 'Papadahandi', 'Raighar', 'Tentulikhunti', 'Umerkote'],
    'Nayagarh': ['Nayagarh', 'Bhapur', 'Daspalla', 'Gania', 'Itamati', 'Khandapada', 'Nuagaon', 'Odagaon', 'Ranpur'],
    'Nuapada': ['Nuapada', 'Boden', 'Khariar', 'Komna', 'Sinapali'],
    'Puri': ['Puri', 'Astaranga', 'Brahmagiri', 'Delanga', 'Gop', 'Kakatpur', 'Konark', 'Krushna Prasad', 'Nimapara', 'Pipili', 'Sadar', 'Satyabadi'],
    'Rayagada': ['Rayagada', 'Ambadola', 'Bisam Cuttack', 'Chandrapur', 'Gunupur', 'Gudari', 'Kalyansinghpur', 'Kashipur', 'Kolnara', 'Muniguda', 'Padmapur', 'Ramanaguda'],
    'Sambalpur': ['Sambalpur', 'Bamra', 'Dhankauda', 'Jujomura', 'Kuchinda', 'Maneswar', 'Naktideul', 'Rairakhol', 'Rengali', 'Yamgarh'],
    'Subarnapur': ['Sonepur', 'Binika', 'Dunguripali', 'Tarva', 'Ullunda'],
    'Sundargarh': ['Rourkela', 'Bargaon', 'Biramitrapur', 'Bonai', 'Brajarajnagar', 'Gurundia', 'Hemgir', 'Kuanrmunda', 'Kutra', 'Lahunipara', 'Lathikata', 'Lefripada', 'Lephripara', 'Nuagaon', 'Rajgangpur', 'Raghunathpali', 'Subdega', 'Sundargarh', 'Tangarpali']
  };

  const handleGPSDetect = () => {
    setGpsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({
            ...formData,
            gpsCoordinates: { latitude, longitude },
            gpsDetected: true
          });
          toast({
            title: "Location detected",
            description: `GPS coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          });
          setGpsLoading(false);
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please select your district manually.",
            variant: "destructive"
          });
          setGpsLoading(false);
        }
      );
    } else {
      toast({
        title: "GPS not supported",
        description: "Please select your district manually.",
        variant: "destructive"
      });
      setGpsLoading(false);
    }
  };

  return (
    <FormStep
      title="Farm Location"
      description="Help us identify your farm location for accurate recommendations"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input 
            id="state" 
            value="Odisha" 
            disabled 
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Select 
            value={formData.district || ''} 
            onValueChange={(value) => updateFormData({ 
              ...formData, 
              district: value, 
              block: '' // Reset block when district changes
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {odishaDistricts.map(district => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="block">Block</Label>
          <Select 
            value={formData.block || ''} 
            onValueChange={(value) => updateFormData({ ...formData, block: value })}
            disabled={!formData.district}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select block" />
            </SelectTrigger>
            <SelectContent>
              {(blocks[formData.district as keyof typeof blocks] || []).map(block => (
                <SelectItem key={block} value={block}>
                  {block}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>GPS Auto-Detection</Label>
          <Button
            type="button"
            variant="outline"
            onClick={handleGPSDetect}
            disabled={gpsLoading}
            className="w-full flex items-center gap-2"
          >
            {gpsLoading ? (
              <Locate className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
            {gpsLoading ? 'Detecting...' : 'Detect Location'}
          </Button>
          {formData.gpsDetected && (
            <Badge variant="secondary" className="bg-success/10 text-success">
              <MapPin className="h-3 w-3 mr-1" />
              GPS Detected
            </Badge>
          )}
        </div>
      </div>
    </FormStep>
  );
};